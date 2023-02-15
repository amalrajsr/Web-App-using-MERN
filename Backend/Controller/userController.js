const userModel=require('../Model/userModel')
const bcrypt = require("bcrypt");
const jwt= require('../Utils/jwt')
const fs= require('fs');
const cloudinary= require('../Utils/cloudinary')
const register= async(req,res)=>{
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
         res.status(201).json({
            user:user._id,
            created:true,
            
         })
         
      
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

const login= async(req,res)=>{

    try{

        const {email,password}=req.body.currentUser
        let status=404
        let data={
          message:'',
          user:null,
          token:null
        }

        const userExist= await userModel.findOne({email})
        if(userExist){
          const match = await bcrypt.compare(password, userExist.password);
           if(match){
               const token = jwt.createToken(userExist.password);
                res.cookie("jwt", token, {httpOnly:false,maxAge:jwt.maxAge});
                data.user={...userExist._doc,token}
                data.token=token
                status=200
           }else{
            data.message='Wrong email or password'
            status=401
           }
        }else{
          data.message='User not found'
          
        }
        res.json(data).status(status)

    }catch(err){
        console.log(err);
    }
 

}

const home =async(req,res)=>{



    res.json({
        loggedIn:true
    })
}

const profile= async (req,res)=>{

    try{

        let image=null,status=404

        const user= await userModel.findOne({_id:req.query.data})
        
        if(user.image){

            image=user.image
            status=201
        }
        res.json({
            image

        }).status(status)
    }catch(err){
        console.log(err);
    }

}

const imageUpload=async(req,res)=>{

    try{
        

        const _id=req.body.id
        const file= req.files.image || false
     

        const userExist=await userModel.findOne({_id})

        if(userExist && file){
            const result=  await cloudinary.uploader.upload(file.tempFilePath, {
                transformation: [
                  { width: 250, height: 200, gravity: "face", crop: "fill" },
                ]
              },(err,result)=>{
                console.log(err)
            })
            await userModel.updateOne({_id},{$set:{image:result.url}})
              
            res.json({
                updated:true,
                imageUrl:result.url
            }).status(201)

        }else{
            res.json({
                updated:false
            }).status(404)
        }
        
    }catch(err){
        console.log(err)
    }
    
}
module.exports={
register,
login,
home,
profile,
imageUpload
}