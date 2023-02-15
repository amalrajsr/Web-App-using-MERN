import React, { useEffect, useState } from 'react'
import './login.css'
import {  Link, useLocation, useNavigate } from 'react-router-dom'
import axios from '../../../axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../../../store'

function Login() {
  const location = useLocation()
  const message = location.state !== null ? location.state.msg : ''
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [currentUser, setcurrentUser] = useState({
    email: null,
    password: null
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/login', {
        currentUser
      }, {
        withCredentials: true
      }
      )
      if (data.message) {
        setError(data.message)
      }
      if (data.user && data.token) {
        // localStorage.setItem('user',JSON.stringify({email:data.user.email,token:data.token}) )
        dispatch(addUser(data.user))
        
        navigate("/")

      }

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='login_container'>
      <div className='login_form_container'>
        <div className='left'>
          <form className='form_container' method='post' onSubmit={handleLogin}>
            <h1>Login to Your Account</h1>
            <span className='text-success'>{!error && message}</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className='input'
              onChange={(e) => setcurrentUser({ ...currentUser, [e.target.name]: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className='input'
              onChange={(e) => setcurrentUser({ ...currentUser, [e.target.name]: e.target.value })}
            />
            <button type="submit" className='green_btn'>
              Log In
            </button>
            {error && <div ><span className='text-danger text-bold'>{error}</span></div>}
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