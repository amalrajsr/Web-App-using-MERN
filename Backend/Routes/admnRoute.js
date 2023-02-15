const express=require('express') 
const admin_router=express()
const AdminController =require('../Controller/adminController')
const jwtAuth=require('../Middleware/jwtAuth')

admin_router.get('/dashboard',jwtAuth.requireAuth,AdminController.home)
admin_router.post('/login', AdminController.Login)
admin_router.post('/add',jwtAuth.requireAuth,AdminController.AddUser)
admin_router.put('/edit',jwtAuth.requireAuth,AdminController.editUser)
admin_router.delete('/deleteUser',jwtAuth.requireAuth,AdminController.deleteUser)
module.exports=admin_router