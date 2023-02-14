const mongoose=require("mongoose")

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]

    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]

    },
    image:String,
    // image: { data: Buffer, contentType: String }

    
})

module.exports= mongoose.model("user",userSchema)