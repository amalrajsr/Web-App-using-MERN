const express=require('express') 
const user_router=express()
const userController= require('../Controller/userController')
const Auth= require('../Middleware/Auth')
user_router.get('/',Auth.isUserLogin)
user_router.post('/register',Auth.userActive,userController.register)
user_router.post('/login',Auth.userActive,userController.login)

module.exports=user_router