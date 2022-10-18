const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type:Number,
    },
    password: {
        type: String,
    },
    block: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    })

const User = mongoose.model('User', userSchema)


const BlogSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    blog:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Blog = mongoose.model('Blog',BlogSchema)

const BookingSchema = mongoose.Schema({
    from:{
        type:String,
        required: true
    },
    to:{
        type:String,
        required: true
    },
    adhaarNo:{
        type:String,
        required: true
    },
    licenceNo:{
        type:String,
        required: true
    },
    picupDate:{
        type:Date,
        required: true
    },
    dropoutDate:{
        type:Date,
        required: true
    },
    bookingStatus:{
        type:String,
    },
    carId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Addcar'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Booking = mongoose.model('Booking',BookingSchema)

module.exports={User,Blog,Booking}
