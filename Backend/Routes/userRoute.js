const express=require('express') 
const user_router=express()
const userController= require('../Controller/userController')
const Auth= require('../Middleware/Auth')
const jwtAuth=require('../Middleware/jwtAuth')
const imageUpload=require('../Middleware/image-upload')

user_router.get('/',jwtAuth.requireAuth,userController.home)
user_router.post('/register',userController.register)
user_router.post('/login',userController.login)
user_router.post('/image_upload',jwtAuth.requireAuth,userController.imageUpload)

// user_router.get('/',Auth.isUserLogin,userController.home)
// user_router.get('/profile',Auth.isUserLogin,userController.profile)
// user_router.get('/profile',jwtAuth.requireAuth,userController.profile)
// user_router.post('/image_upload',Auth.isUserLogin,userController.imageUpload)
module.exports=user_router