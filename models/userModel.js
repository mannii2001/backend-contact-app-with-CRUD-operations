const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Add user Name"]
    },
    email:{
        type:String,
        required:[true,"Add the user Email Address"],
        unique:[true,"email address already used"]
    },
    password:{
        type:String,
        required:[true,"Add the user password"]
    }
},
{
    timestamps:true,
})

module.exports = mongoose.model("User",userSchema);