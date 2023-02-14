import React, { useState,useEffect } from 'react'
import UserNavbar from '../Navbar/UserNavbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from '../../../axios'
import './profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Profile() {

  const navigate=useNavigate()
  const[cookies,setCookie,removeCookie]=useCookies([])
  const [showModal,setshowModal]=useState(false)
  const [image,setImage]=useState('')
  const [preview,setPreview]=useState('')
  const dispatch=useDispatch()
  const userData= useSelector((state)=>{
    return state.user
  })
const username=userData[0].name || ''
const email=userData[0].email || ''
const userId= userData[0]._id || ''
const userImage= userData[0].image || ''

const handleImageSubmit= async()=>{
 
  try{

  const userdata = new FormData();
  userdata.append('image', preview);
  userdata.append('id',userId)
  
  console.log(userdata)
  const {data}= await axios.post('/image_upload',userdata,{
    headers: {
    'Content-Type': 'multipart/form-data'
    }},{
   withCredentials:true
})
  console.log(data)
if(data.imageUrl){
  console.log(data.imageUrl)
  //  dispatch(updateUser(data.imageUrl))
  setImage(data.imageUrl)

}

setPreview('')
setshowModal(false);
  }catch(err){
    console.log(err)
  }
}

// for closing modal
const handleClose = () =>{
  setshowModal(false);
  setPreview('')
}
// for opening modal
const handleShow = () => setshowModal(true);
  return (
    <>
   <UserNavbar/>
   <div className='profile d-flex container'>
    <div className='profile-left col-4 ms-2'>
      <h2 className='mb-4 text-white'>PROFILE</h2>
   <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" width={250} height={200}  src={image || userImage} onClick={handleShow} />
      <Card.Body>
        <Card.Title></Card.Title>
        <div className='d-flex justify-content-center'>
        <Button variant="dark" onClick={handleShow}>Edit</Button>
        </div>
      </Card.Body>
    </Card>
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>PROFILE IMAGE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='file'accept='.jpeg,.png,.jpg,.webp' name='image' onChange={(e)=>setPreview(e.target.files[0])}/>
           <img  className='mb-2' width="100px" height="80px" src={preview?URL.createObjectURL(preview):''}/>          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant="dark" onClick={handleImageSubmit} > 
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    <div className='profile-right col-8'>
    <h2 className='mb-4 text-white'>DETAILS</h2>
     <input className='mb-5 detail-input' value={username} disabled/>
     <input className='mb-5 detail-input' value={email} disabled/>
    </div>
    </div>
    </>
  )
}

export default Profile