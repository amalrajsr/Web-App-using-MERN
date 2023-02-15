const jwt= require('jsonwebtoken')

const requireAuth= (req,res,next)=>{

    // verify authentication
    const {authorization} =req.headers
    if(!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }

        const token= authorization.split(' ')[1]
        try{
            jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{

                if(err){
        
                    console.log(err)
                    res.json({
                        error:'Invalid Authorization token'
                    }).status(401)
                }else{
                   next()
                }
             })

        }catch(err){
            console.log(err)
            res.json({
                error:'Authorization toke required'
            }).status(401)
        }

    
}

module.exports= {requireAuth}