import React, { useEffect, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../../../store'
import { useCookies } from 'react-cookie'

function Login() {
  const[cookies]=useCookies([])
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [error,setError]=useState(false)
  const [currentUser,setcurrentUser]=useState({
    email:null,
    password:null
  })
 
  const handleLogin=async(e)=>{
    e.preventDefault()
    try{
const {data}=await axios.post('/login',{
  currentUser
},{
   withCredentials:true
}
)
 if(data.message){
  setError(data.message)
 }
 if(data.user){
  dispatch(addUser(data.user))
  navigate("/")

 }

    }catch(err){
      console.log(err)
    }
}
  return (
    <div className='login_container'>
    <div className='login_form_container'>
      <div className='left'>
        <form className='form_container' method='post' onSubmit={handleLogin}>
          {error && <div className='error'><span>{error}</span></div> }
          <h1>Login to Your Account</h1>
          <input
            type="email"
            placeholder="Email"
            name="email" 
            className='input'
             onChange={(e)=>setcurrentUser({...currentUser,[e.target.name]:e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className='input'
            onChange={(e)=>setcurrentUser({...currentUser,[e.target.name]:e.target.value})}
          />
          <button type="submit" className='green_btn'>
            Log In
          </button>
        </form>
      </div>
      <div className='right'>
        <h1>New Here ?</h1>
        <Link to="/signup">
          <button type="button" className='white_btn'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  </div>
     )
}

export default Login