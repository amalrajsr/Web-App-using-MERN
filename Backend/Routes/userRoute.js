const express=require('express') 
const user_router=express()
const userController= require('../Controller/userController')
const jwtAuth=require('../Middleware/jwtAuth')
const imageUpload=require('../Middleware/image-upload')

user_router.get('/',jwtAuth.requireAuth,userController.home)
user_router.post('/register',userController.register)
user_router.post('/login',userController.login)
user_router.post('/image_upload',jwtAuth.requireAuth,userController.imageUpload)

module.exports=user_router