const jwt= require('jsonwebtoken')

//-------------------------------------------- Admin Section----------------------------



// To Check if jwt exist or not-----------------------
const isLogin= (req,res,next)=>{

    try{
    const token=req.cookies.jwtAd
   
   if(token){
 
    jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{

        if(err){

            console.log(err)
            res.json({
                loggedIn:false
            })
        }else{
           next()
        }
    })

   }else{
   next()
   }
}catch(error){
    console.log(error)
}

}

//-------------------------------------------------------------------to redirect page to dashboard if jwt exists------------

const isActive= (req,res,next)=>{

    try{
    const token=req.cookies.jwtAd
   
   // Checking jwt exists or not

   if(token){
 
    jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{

res.json({
    loggedIn:true
})       
    })

   }else{
    next()
    
   }
}catch(error){
    console.log(error)
}

}








//---------------------------------User Side-----------------------------------


// Redirect to login if jwt doesn't exists---------
const isUserLogin= (req,res,next)=>{

    try{
     
const token= req.cookies.jwt
if(token){
    jwt.verify(token,process.env.SECRET,(error,decodedToken)=>{

        if(error){
           console.log(error)
           res.json({
            loggedIn:false
           })
        }
        else{
            next()
        }
    })
}
else{
    next()
    }
       
    }catch(error){

        console.log(error)
    }
}




//---------------------------------------------- redirect to homepage if jwt exists---------------- not to show otp/login page
const userActive= (req,res,next)=>{

    try{
      const token= req.cookies.jwt

   

      if(token){
        jwt.verify(token,process.env.SECRET,(error,decodedToken)=>{

            if(error){

                console.log(error)
                next()
            }
            else{
                res.json({
                    loggedIn:true
                   })
                
            }
        
        })
      }
      else{

        next()
      }

    }catch(error){

        console.log(error)
    }

}

module.exports={
 isLogin,
isActive,
 isUserLogin,
 userActive
}