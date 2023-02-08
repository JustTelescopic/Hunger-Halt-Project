const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    location : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password1 : {
        type : String,
        required : true
    },
    password2 : {
        type : String,
        required : true
    },
})

const Register = new mongoose.model("reguser", userSchema)

module.exports = Register