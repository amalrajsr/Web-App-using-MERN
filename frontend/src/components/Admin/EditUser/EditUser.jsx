import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from '../../../axios'

function EditUser() {
  const navigate=useNavigate()
  const location=useLocation()
  const {_id,name,email}=location.state.user
  const [error,setError]=useState(false)
  const [editUser,setEditUser]= useState({
    id:_id,
    name,
    image:null
  })

  const handleImageChange =(e)=>{

    const file=e.target.files[0]
  
    
    const  allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/;
    if (!allowedExtensions.exec(file.name)) {
      setError(true)    
  }else{

    setEditUser({...EditUser,image:file})
    setError(false)    

  }
}

  const handleSubmit= async(e)=>{
    try{
      e.preventDefault()
      const userdata = new FormData();
      userdata.append('image', editUser.image);
      userdata.append('name',editUser.name)
      userdata.append('id',editUser.id)
        const {data}= await axios.put('/admin/edit',userdata,{
        headers: {
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