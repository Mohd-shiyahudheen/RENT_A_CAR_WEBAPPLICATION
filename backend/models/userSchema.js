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


module.exports={User,Blog}
