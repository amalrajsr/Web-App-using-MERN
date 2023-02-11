const userModel=require('../Model/userModel')
const bcrypt = require("bcrypt");
const jwt= require('../Utils/jwt')
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
          user:null
        }

        const userExist= await userModel.findOne({email})
        if(userExist){
          const match = await bcrypt.compare(password, userExist.password);
           if(match){
               const token = jwt.createToken(userExist.password);
                res.cookie("jwt", token, {httpOnly:false,maxAge:jwt.maxAge});
                data.user=userExist
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

module.exports={
register,
login,
home
}