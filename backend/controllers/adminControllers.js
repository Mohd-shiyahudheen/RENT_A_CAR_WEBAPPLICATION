const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminSchema").Admin;
const AddCar = require("../models/adminSchema").AddCars;
const User = require("../models/userSchema").User;
const Blog = require("../models/userSchema").Blog;
const multer = require("multer");
const cloudinaryUploadImg = require("../utils/cloudinary");

//define multer storege
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./backend/public/images/");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    req.session.imgmessage = "Only JPEG OR PNG images";
  }
};

const upload = multer({
  storage: Storage,
  fileFilter: fileFilter,
});

const AdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const admin = await Admin.findOne({ email: email });
  console.log(admin);

  if (admin && (await password) == admin.password) {
    res.json({
      _id: admin._id,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid username or password");
  }
});

//Add new car//
const Addcars = asyncHandler(async (req, res) => {
  const image = req.file.path;
  console.log(image);
  const imgUploaded = await cloudinaryUploadImg(image);
  console.log(imgUploaded);
  try {
    const {
      carModel,
      transmissionType,
      fuelType,
      seats,
      dayRent,
      extraFare,
      plan1,
      km1,
      fare1,
      plan2,
      km2,
      fare2,
      plan3,
      km3,
      fare3,
    } = req.body;
    console.log(req.body);

    const addCars = await AddCar.create({
      carModel,
      transmissionType,
      fuelType,
      seats,
      dayRent,
      extraFare,
      image: imgUploaded.url,
      farePlan: [
        {
          plan: plan1,
          km: km1,
          fare: fare1,
        },
        {
          plan: plan2,
          km: km2,
          fare: fare2,
        },
        {
          plan: plan3,
          km: km3,
          fare: fare3,
        },
      ],
    });
    console.log(addCars);

    res.status(201).json(addCars);
  } catch (error) {
    res.status(500).json("Data not Added");
  }
});

const findAllCars = asyncHandler(async (req, res) => {
  try {
    const findCars = await AddCar.find({});
    res.status(200).json(findCars);
  } catch (error) {
    res.status(500).json("Data not find");
  }
});

//User managment

const viewUsers = asyncHandler(async (req, res) => {
  try {
    const findUsers = await User.find({});
    res.status(200).json(findUsers);
  } catch (error) {
    res.status(500).json("Do not find Users");
  }
});

//Delete Cars
const deleteCar = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const removeCar = await AddCar.deleteOne({ _id: id });
    res.status(200).json(removeCar);
  } catch (error) {
    res.status(500).json("Error deleting user");
  }
});

//Car details showing edit page
const editCar = async (req, res) => {
  const id = req.params.id;
  try {
    const updateCar = await AddCar.findById({ _id: id });
    res.status(200).json(updateCar);
  } catch (error) {
    res.status(500).json("car data not finded");
  }
};

//Post Edited Cars
const postEditedCars = async (req, res) => {
  const id = req.params.id;
  try {
    const PostCars = await AddCar.findByIdAndUpdate({ _id: id })
    res.status(200).json(PostCars)

  } catch (error) {
    res.status(500).json("car data not edited");
  }

}

const blockUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const block = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { block: true } },
      { upsert: true })
    res.status(200).json(block)
  } catch (error) {
    res.status(500).json("User Block failed")
  }
}

//Create Blog
const userBlog = asyncHandler(async(req, res) => {
  const picture = req.file.path
  console.log(picture);
  const pictureUpload = await cloudinaryUploadImg(picture)
  console.log(pictureUpload);
  try {
    const {
      userName,
      blog,
      userId
    } = req.body
    console.log(req.body);

    const createBlog = await Blog.create({
      userName,
      blog,
      picture:pictureUpload.url,
      userId
    })
    console.log(createBlog);
    res.status(200).json(createBlog)

  } catch (error) {
    res.status(500).json("Blog not Created")
  }
});

//get All blog data
const displayBlog = asyncHandler(async(req,res)=>{
  try {
    const blogData = await Blog.find({})
    console.log(blogData);
    res.status(200).json(blogData)
  } catch (error) {
    res.status(500).json("cloud not fetch data in to server")
  }
})

module.exports = {
  AdminLogin,
  upload,
  Addcars,
  viewUsers,
  findAllCars,
  deleteCar,
  editCar,
  postEditedCars,
  blockUser,
  userBlog,
  displayBlog
};
