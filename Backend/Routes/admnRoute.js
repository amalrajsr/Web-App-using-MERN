const express=require('express') 
const admin_router=express()
const AdminController =require('../Controller/adminController')
const Auth= require('../Middleware/Auth')
admin_router.get('/dashboard',Auth.isLogin,AdminController.home)
admin_router.post('/login',Auth.isActive, AdminController.Login)
admin_router.post('/add',Auth.isLogin,AdminController.AddUser)
admin_router.delete('/deleteUser',Auth.isLogin,AdminController.deleteUser)
module.exports=admin_router