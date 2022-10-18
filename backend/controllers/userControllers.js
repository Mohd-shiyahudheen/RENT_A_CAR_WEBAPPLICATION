const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler");
require('dotenv').config()
const User = require("../models/userSchema").User
const Cars = require("../models/adminSchema").AddCars
const Booking = require("../models/userSchema").Booking
const generateToken = require('../utils/generateToken')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceID = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);
const { OAuth2Client } = require('google-auth-library')
const clients = new OAuth2Client(process.env.GOOGLE_ID)
const Razorpay = require('razorpay');
const key_id = process.env.KEY_ID;
const key_secreat = process.env.KEY_SECRET;
const crypto = require("crypto");






//User Signup//
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body
    console.log(req.body);

    if (!name || !email || !password || !phone) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    } else {
        //Send otp to user//
        client.verify.v2.services(serviceID)
            .verifications
            .create({ to: `+91${phone}`, channel: 'sms' })
            .then(verification => console.log(verification))

        res.status(200).json({
            name, email, password, phone
        })
    }
})

//Verifying otp//
const checkVerification = asyncHandler(async (req, res) => {
    const { otp, name, email, phone, password } = req.body

    //Otp verifying code//
    client.verify.v2.services(serviceID)
        .verificationChecks
        .create({ to: `+91${phone}`, code: otp })
        .then(verification_check => console.log(verification_check.sid));

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
    })

    if (user) {
        console.log("okokokokok");
        console.log(user);
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


//Google Sign up//
const GoogleSignin = asyncHandler(async (req, res) => {
    const { token } = req.body
    console.log(req.body);
    const ticket = await clients.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID
    });
    console.log(ticket);
    let users = [];
    const { name, email, picture } = ticket.getPayload()
    users = { name, email, picture };
    console.log(users);
    const userAllReadyExist = await User.findOne({ email });
    console.log(userAllReadyExist);
    if (userAllReadyExist) {
        return res.status(200).json({ userAllReadyExist })
    } else {
        let res = await User.create({ ...users });
        console.log(res)
        return res.status(201).json({ name, email, picture })
    }
})


//User Login//
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json(user)
    } else {
        res.status(400)
        throw new Error('Invalid Username Or Password')
    }
})

//Display cars//
const displayCars = async (req, res) => {
    try {
        const carData = await Cars.find({})
        console.log(carData);
        res.status(200).json(carData)
    } catch (error) {
        res.status(500).json("data fetching  error")
    }
}
//Booking page display//   
const BookingCar = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const booking = await Cars.findById({ _id: id })
        console.log(booking);
        res.status(200).json(booking)
    } catch (error) {
        res.status(500).json("data fetching failed")
    }
})

const bookingData = async (req, res) => {
    const id = req.params.id

    console.log(req.body);
    try {
        const { from, to, adhaarNo, licenceNo, picupDate, dropoutDate, carId, userId } = req.body

        const data = await Booking.create({
            from,
            to,
            adhaarNo,
            licenceNo,
            picupDate,
            dropoutDate,
            carId,
            userId,
            bookingStatus: "booked"
        })
        console.log(data);
        const carAndpayment = await Booking.findById({ _id: data._id }).populate('carId')
        console.log(carAndpayment.carId);
        res.status(200).json(carAndpayment)
    } catch (error) {
        res.status(500).json("Booking data not Added")
    }
}

//Razorpay instance creation//
const instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secreat,
});

const generateRazorpay = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { amount } = req.body
    try {
        console.log(amount);
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong...!" });
            }
            res.status(200).json({ data: order });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})

//Verify Payment//
const verifyPayment = asyncHandler(async (req, res) => {
    console.log("bahabshbahbs");
    console.log(req.body);
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }

})

//Booking status
// const bookingStatus=asyncHandler(async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }

// })


module.exports = {
    registerUser,
    loginUser,
    checkVerification,
    GoogleSignin,
    displayCars,
    BookingCar,
    bookingData,
    generateRazorpay, 
    verifyPayment
}