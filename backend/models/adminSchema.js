const mongoose = require('mongoose')


const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model('Admin', adminSchema)



const addCras = mongoose.Schema({
    date:{
        type:Date,
        default: Date.now
    },
    carModel:{
        type:String,
        required:true
    },
    transmissionType:{
        type:String,
        required:true
    },
    fuelType:{
        type:String,
        required:true
    },
    seats:{
        type: String,
        required:true
    },
    farePlan:{
        type:Array,
        required:true
    },
    extraFare:{
        type:String
    },
    dayRent:{
        type:String
    },
    image:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
})

const AddCars = mongoose.model('Addcar',addCras)




module.exports={Admin,AddCars}
