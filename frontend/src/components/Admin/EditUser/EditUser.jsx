import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from '../../../axios'
import './edituser.css'

function EditUser() {
  const navigate=useNavigate()
  const location=useLocation()
  const {_id,name,email,image}=location.state.user
  const [error,setError]=useState(false)
  const [editUser,setEditUser]= useState({
    name,
    image:null
  })

  // fetching admin token from redux
  const adminToken= useSelector((state)=>{
		return state.admin
	})
   

  const handleImageChange =(e)=>{

    const file=e.target.files[0]  
    const  allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/;
    if (!allowedExtensions.exec(file.name)) {
      setError(true)    
  }else{

    setEditUser({...editUser,image:file})
    setError(false)    

  }
}

  const handleSubmit= async(e)=>{
    try{
      e.preventDefault()
      const userdata = new FormData();
      userdata.append('image', editUser.image);
      userdata.append('name',editUser.name)
      userdata.append('id',_id)
        const {data}= await axios.put('/admin/edit',userdata,{
        headers: {
          'Authorization':`Bearer ${adminToken[0]}`,
        'Content-Type': 'multipart/form-data'
        }},{
       withCredentials:true
    })
             if(data.update){
              navigate("/admin/dashboard")
             }
    }catch(err){
      console.log(err);
    }


  }
  return (
    <>
    <div className='login_container'>
    <div className='login_form_container'>
      <div className='left'>
        <form className='form_container'  method='post' onSubmit={handleSubmit}>
          {error && <div className='error'><span>{error}</span></div> }
          <h1>Edit User</h1>
          <input
            type="name"
            placeholder="name"
            name="name" 
            value={editUser.name}
            className='input'
            
            onChange={(e)=>setEditUser({...editUser,name:e.target.value})}
            

          />
          <input
            type="email"
            placeholder="Email"
            name="email" 
            className='input'
            value={email}
            disabled
            
            

          />
          <input
            type="file"
            placeholder=""
            name="image"
             
            className='input'
            onChange={handleImageChange}
          />
         <span> <img src={image} alt="user" width={50} height={50}/></span>
         { !error && <button type="submit" className='green_btn'> Edit User</button>}
          {error && <div><span className='text-danger mt-1'>Only jpg | jpeg | png are allowed </span></div>}
        </form>
      </div>
      <div className='right'>
        <Link to="/admin/dashboard">
          <button type="button" className='white_btn'>
          back to home
          </button>
        </Link>
      </div>
    </div>
  </div>
    </>
  )
}

export default EditUser