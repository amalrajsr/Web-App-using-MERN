import React, { useEffect } from 'react'
import './home.css'
import {  useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from '../../../axios'
// import { ToastContainer,toast } from 'react-toastify'
function Home() {
	const navigate=useNavigate()
	const[cookies,setCookie,removeCookie]=useCookies([])


	useEffect(()=>{
		const verifyUser = async () => {
			if (!cookies.jwt) {
				navigate('/login')
			} else {
				const { data } = await axios.get('/', {}, { withCredentials: true })
				console.log(data)
				  if(data.loggedIn===true){
					navigate('/')
				  }else{
					navigate('/login')
				  }
			}
		}
   verifyUser()
	},[navigate,removeCookie])



	const logout=()=>{
		removeCookie("jwt")
		navigate('/login')

	}
  return (
	<div >
    <div className='main_container'>
			<nav className='navbar'>
				<h1>Welcome Back</h1>
				
				<button className='white_btn' onClick={logout}>Logout</button>					
			</nav>
	</div>
	<div className='background'/>
	</div>
  )
}

export default Home