const mongoose = require("mongoose")

const ngoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    id : {
        type : Number,
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

const ngoRegister = new mongoose.model("regngo", ngoSchema)

module.exports = ngoRegister