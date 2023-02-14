const express=require('express') 
const user_router=express()
const userController= require('../Controller/userController')
const Auth= require('../Middleware/Auth')
const imageUpload=require('../Middleware/image-upload')

user_router.get('/',Auth.isUserLogin,userController.home)
user_router.post('/register',Auth.userActive,userController.register)
user_router.post('/login',Auth.userActive,userController.login)
user_router.get('/profile',Auth.isUserLogin,userController.profile)
user_router.post('/image_upload',Auth.isUserLogin,userController.imageUpload)
//imageUpload.single('image')
module.exports=user_router