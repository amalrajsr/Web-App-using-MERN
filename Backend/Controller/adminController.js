const userModel=require('../Model/userModel')
const jwt= require('../Utils/jwt')
const bcrypt = require("bcrypt");
const fs= require('fs');
const cloudinary= require('../Utils/cloudinary')

const Login= async(req,res)=>{
    try{

        let message='',admin=false
        const {name,password}=req.body.admin
            if(password===process.env.ADMIN_PASS && name===process.env.ADMIN){
                
                const token = jwt.createToken(process.env.ADMIN_PASS);
                res.cookie("jwtAd", token, {httpOnly:false,maxAge:jwt.maxAge});
                admin=token
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
try{
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

}catch(err){
    console.log(err);
}
    
}

const AddUser= async(req,res)=>{
    try{
      
     const{name,email,pass}=req.body
     const file= req.files.image || false
     const result=  await cloudinary.uploader.upload(file.tempFilePath, {
        transformation: [
          { width: 250, height: 200, gravity: "face", crop: "fill" },
        ]
      },(err,result)=>{
        console.log(err)
    })
        const passwordHash = await bcrypt.hash(pass, 12);
        const user= new userModel({
            name,
            email,
            password:passwordHash,
            image:result.url
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

const editUser= async (req,res)=>{

    try{
        const {name,id}=req.body
        let dataToUpdate={name}
        if(req.files!==null){
            const file=req.files.image
            const result=  await cloudinary.uploader.upload(file.tempFilePath, {
                transformation: [
                  { width: 250, height: 200, gravity: "face", crop: "fill" },
                ]
              },(err,result)=>{
                if(err){
                    res.json({
                        update:false
                    }).status(500)
                }else{
                    dataToUpdate={name,image:result.url}
                }
                
            })
    
        }else{
            console.log('no file');
        }
    
       
        await userModel.updateOne({_id:id},{$set:dataToUpdate})
        console.log('success')
        res.json({
            update:true
        }).status(201)

    }catch(err){
        console.log(err)
    }

   
}

const deleteUser= async(req,res)=>{

    try{
        console.log(req.query)
        console.log(req.params);
        const user=req.body.data
        await userModel.deleteOne({_id:user})
        console.log('user deleted');
        res.json({
           delete:true
        }).status(201)
    }catch(err){
        console.log(err)
    }
     
    }
module.exports={
    Login,
    home,
    AddUser,
    editUser,
    deleteUser
}