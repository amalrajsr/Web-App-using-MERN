import React, { useEffect, useState } from 'react'
import './adduser.css'
import { Link, useNavigate, useResolvedPath } from 'react-router-dom'
import axios from '../../../axios'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'

function Signup() {
  const navigate=useNavigate()
  const [cookie]= useCookies([])
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [pass,setPass]=useState()
  const [image,setImage]=useState()
  const [error,setError]=useState(false)

  const adminToken=useSelector((state)=>{
    return state.admin
  })
  const handleImageChange =(e)=>{

    const file=e.target.files[0]
  
    
    const  allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/;
    if (!allowedExtensions.exec(file.name)) {
      setError(true)    
  }else{

    setImage(file)
    setError(false)    

  }
}

 const handleSubmit = async(e)=>{

      e.preventDefault()
      try{
  const userdata = new FormData();
  userdata.append('image', image);
  userdata.append('name',name)
  userdata.append('email',email)
  userdata.append('pass',pass)
    const {data}= await axios.post('/admin/add',userdata,{
    headers: {
      'Authorization':`Bearer ${adminToken[0]}`,
    'Content-Type': 'multipart/form-data'
    }},{
   withCredentials:true
})
         if(data.message){
           setError(data.message)
         }else{
          navigate("/admin/dashboard")
         }
      }catch(err){
        console.log(err)
      }
 }
  return (
    <div className='login_container'>
    <div className='login_form_container'>
      <div className='left'>
        <form className='form_container'  method='post' onSubmit={handleSubmit}>
          {error && <div className='error'><span>{error}</span></div> }
          <h1>Add User</h1>
          <input
            type="name"
            placeholder="name"
            name="name" 
            className='input'
            required
            onChange={(e)=>setName(e.target.value)}

          />
          <input
            type="email"
            placeholder="Email"
            name="email" 
            className='input'
            required
            onChange={(e)=>setEmail(e.target.value)}

          />
          <input
            type="password"
            placeholder="Password"
            name="password"
             required
            className='input'
            onChange={(e)=>setPass(e.target.value)}
          />
          <input
            type="file"
            placeholder=""
            name="image"
             required
            className='input'
            onChange={handleImageChange}

           // onChange={(e)=>setImage(e.target.files[0])}
          />

        { !error && <button type="submit" className='green_btn'> Add User </button> }  
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
    )
}

export default Signup