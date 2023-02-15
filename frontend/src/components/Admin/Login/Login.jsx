import React, { useState } from 'react'
import './login.css'
import axios from '../../../axios'
import { useNavigate } from 'react-router-dom'
import { addAdmin } from '../../../store'
import { useDispatch } from 'react-redux'
function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [admin, setAdmin] = useState({
    name: null,
    password: null
  })


  const handleLogin = async (e) => {
    e.preventDefault()
    try {

      const { data } = await axios.post('/admin/login', {
        admin
      }, {
        withCredentials: true
      })
      console.log(data)
      if (data.message) {
        setError(data.message)
      }
      if (data.admin) {
        dispatch(addAdmin(data.admin))
        navigate('/admin/dashboard')
      }

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='login_container'>
      <div className='login_form_container'>
        <div className='left'>
          <form className='form_container' method='post' onSubmit={handleLogin}>
            <h1>Admin Panel</h1>
            <input
              type="text"
              placeholder="name"
              name="name"
              className='input'
              onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className='input'
              onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })}

            />
            <button type="submit" className='green_btn'>
              Log In
            </button>
            {error && <div><span className='text-danger'>{error}</span></div>}

          </form>
        </div>
        <div className='right'>

        </div>
      </div>
    </div>
  )
}

export default Login