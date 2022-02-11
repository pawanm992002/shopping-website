const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const validator = require('validator')

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true,"user email is required"],
        unique: true,
        // validate:{
        //     validator: function (value){
        //         if(!validator.isEmail(value)){
        //             return "enter correct email"
        //         }
        //     }
        // }
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("please input a correct email")
            }
        }
    },
    phone:{
        type: Number,
        unique: [true, "this is already registered number"],
        required: true
        // validate(value){
        //     if(!validator.isMobilePhone('en-IN')){
        //         throw Error("please input a corrert Phone number of  india")
        //     }
        // }
    },
    password:{
        type: String
    },
    cpassword:{
        type: String
    }
})

customerSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,8)
        console.log(hashPassword)
    }
    next()
})

const customerDetail = new mongoose.model("custumerDetails",customerSchema)

module.exports = customerDetail