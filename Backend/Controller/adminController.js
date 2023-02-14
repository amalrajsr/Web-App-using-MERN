const userModel=require('../Model/userModel')
const jwt= require('../Utils/jwt')
const bcrypt = require("bcrypt");

const Login= async(req,res)=>{
    try{

        let message='',admin=false
        const {name,password}=req.body.admin
            if(password===process.env.ADMIN_PASS && name===process.env.ADMIN){
                
                const token = jwt.createToken(process.env.ADMIN_PASS);
                res.cookie("jwtAd", token, {httpOnly:false,maxAge:jwt.maxAge});
                admin=true
            }else{
                message='Wrong Credentials'
            }
          
            res.json({
                message,
                admin
            })

    }catch(error){
        console.log(error);
    }
}
const home =async(req,res)=>{

    const search=req.query.data || ''
    const userData=await userModel.find({
        $or: [
            { name: { $regex: '^' + search + '.*' ,$options:'i'} },
             ]
    })
    res.json({
        loggedIn:true,
        userData
    })
}

const AddUser= async(req,res)=>{
    try{
      
     const{name,email,pass}=req.body.userdata
        const passwordHash = await bcrypt.hash(pass, 12);
        const user= new userModel({
            name,
            email,
            password:passwordHash
          })

          await user.save()
          console.log('user added to database');
         res.json({
            user:user._id,
            created:true,
            
         }).status(201)
         
      
    }catch(err){
    
        if(err.code===11000){
            res.json({
                        created:false,
                        message:'Email already exists'
                     })
                     res.status(401)
            console.log('email already exists');
        }
    }
}

const deleteUser= async(req,res)=>{
     const user=req.body.data
     await userModel.deleteOne({_id:user})
     console.log('user deleted');
     res.json({
        delete:true
     }).status(200)
    }
module.exports={
    Login,
    home,
    AddUser,
    deleteUser
}