
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {removeUser  } from '../../../store/slices/userSlice'
import './navbar.css'
function UserNavbar() {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const userData= useSelector((state)=>{
    return state.user
  })

  const userName= userData.value?userData.value.name:''



  const  handleLogout=()=>{
     dispatch(removeUser(userData))
      navigate('/login')    
  }


  return (
    <Navbar variant="dark" bg="dark" expand="lg" className='d-flex'>
          <div className='ms-2'>
              <Navbar.Brand >Welcome Back {userName}</Navbar.Brand>
         </div>
         <div className='navbar-div'>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={userName}
              menuVariant="dark"
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item  onClick={handleLogout} >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </div>
    </Navbar>
  );
}

export default UserNavbar;