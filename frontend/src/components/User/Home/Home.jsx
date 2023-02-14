import React, { useEffect } from 'react'
import './home.css'
import {  useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from '../../../axios'
import UserNavbar from '../Navbar/UserNavbar'
// import { ToastContainer,toast } from 'react-toastify'
function Home() {
// 	const navigate=useNavigate()
// 	const[cookies,setCookie]=useCookies([])
// 	useEffect(()=>{
		
//    verifyUser()
// 	},[navigate,cookies])
// 	const verifyUser = async () => {
// 		if (!cookies.jwt) {
// 			navigate('/login')
// 		} else {
// 			const { data } = await axios.get('/', {}, { withCredentials: true })
// 			  if(data.loggedIn){
// 				navigate('/')
// 			  }else{
// 				navigate('/login')
// 			  }
// 		}
// 	}

  return (
	<UserNavbar/>			

	
  )
}

export default Home