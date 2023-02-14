import React, { useEffect } from 'react'
import './home.css'
import UserNavbar from '../Navbar/UserNavbar'
import backgroud from './bg.jpg'
function Home() {

  return (
    <>
	<UserNavbar/>		
  <img src={backgroud} className='background' alt="background" />	
  </>
	
  )
}

export default Home