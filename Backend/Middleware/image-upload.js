const multer =require('multer')


let storage=multer.diskStorage({

    
    destination: function(req,file,cb){
        cb(null,'public/')
    },
    filename:function(req,file,cb){
        let id=Math.floor(Math.random() * 1000000000000000);
        const name=file.originalname+'-'+id
    cb(null,name)
    }
})

const upload= multer({
    storage:storage,
    fileFilter: function (req, file, cb,next) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
       //   return cb(new Error("Only image files are allowed!"));
         // req.msg='Only image files are allowed!'
        
        }
        cb(null, true);
      },
})


module.exports=upload