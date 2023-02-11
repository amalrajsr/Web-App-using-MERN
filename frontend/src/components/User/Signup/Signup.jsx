import React, { useEffect, useState } from 'react'
import './signup.css'
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
    const userExist=async()=>{
      if(cookie.jwt){
        const {data}=await axios.post('/register',{},{withCredentials:true})
      if(data.loggedIn){
        navigate('/')	
      }
      }
      }
      userExist()
  },[navigate,cookie.jwt])
 const handleSubmit = async(e)=>{
      e.preventDefault()
      try{
         
         const {data}= await axios.post('/register',{
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
          navigate("/login")
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
          <h1>Create Your Account</h1>
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
            Sign Up
          </button>
        </form>
      </div>
      <div className='right'>
        <h3>Already have an account ?</h3>
        <Link to="/login">
          <button type="button" className='white_btn'>
            Sign in
          </button>
        </Link>
      </div>
    </div>
  </div>
    )
}

export default Signup