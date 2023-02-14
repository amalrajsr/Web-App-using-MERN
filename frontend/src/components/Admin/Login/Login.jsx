import React, { useEffect, useState } from 'react'
import './login.css'
import axios from '../../../axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { addAdmin } from '../../../store'
import { useDispatch } from 'react-redux'
function Login() {
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const [cookies]=useCookies([])
  const [error,setError]=useState(false)
  const [admin,setAdmin]=useState({
    name:null,
    password:null
  })

  // useEffect(()=>{
  //   const adminExists=async()=>{
  //     if(cookies.jwtAd){
  //       const {data}= await axios.post('/admin/login',{},{withCredentials:true})
  //       if(data.loggedIn){
  //         navigate('/admin/dashboard')
  //       }
  //     }
  //   }
  //   adminExists()
  // },[navigate,cookies.jwtAd])

  const handleLogin=async(e)=>{
    e.preventDefault()
    try{
      
      const {data}= await axios.post('/admin/login',{
        admin
      },{
        withCredentials:true
      })
      console.log(data)
    if(data.message){
      setError(data.message)
    }else{
      dispatch(addAdmin({admin:true}))
      navigate('/admin/dashboard')
    }

    }catch(error){
      console.log(error)
    }

}
  return (
    <div className='login_container'>
    <div className='login_form_container'>
      <div className='left'>
        <form className='form_container' method='post' onSubmit={handleLogin}>
          {error && <div className='error mx-auto'><span>{error}</span></div> }
          <h1>Admin Panel</h1>
          <input
            type="text"
            placeholder="name"
            name="name" 
            className='input'
             onChange={(e)=>setAdmin({...admin,[e.target.name]:e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className='input'
            onChange={(e)=>setAdmin({...admin,[e.target.name]:e.target.value})}

          />
          {/* {error && <div className={error_msg}>{error}</div>} */}
          <button type="submit" className='green_btn'>
            Log In
          </button>
        </form>
      </div>
      <div className='right'>
        
      </div>
    </div>
  </div>
     )
}

export default Login