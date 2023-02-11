import React, { useEffect, useState } from 'react'
import './adduser.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../axios'
import { useCookies } from 'react-cookie'

function Signup() {
  const navigate=useNavigate()
  const [cookie]= useCookies([])
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [pass,setPass]=useState()
  const [error,setError]=useState(false)
  useEffect(()=>{
    const adminExist=async()=>{
      if(cookie.jwtAd){
        const {data}=await axios.post('/admin/dashboard',{},{withCredentials:true})
      if(data.loggedIn){
        navigate('/admin/login')	
      }
      }
      }
      adminExist()
  },[navigate,cookie.jwtAd])
 const handleSubmit = async(e)=>{
      e.preventDefault()
      try{
         
         const {data}= await axios.post('/admin/add',{
          userdata:{
              name,
              email,
              pass
          }
         },
         {
          withCredentials:true
         }
         )
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
        <form className='form_container' method='post' onSubmit={handleSubmit}>
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
          <button type="submit" className='green_btn'>
            Add User
          </button>
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