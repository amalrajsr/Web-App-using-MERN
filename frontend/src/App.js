// import Login from './components/User/Login/Login';
// import Signup from './components/User/Signup/Signup';
// import AdminLogin from './components/Admin/Login/Login'
// import AddUser from './components/Admin/AddUser/AddUser'
// import EditUser from './components/Admin/EditUser/EditUser';
import Home from './components/User/Home/Home';
import AdminHome from './components/Admin/Home/Home'
import Profile from './components/User/Profile/Profile';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import {Navigate, BrowserRouter,Route,Routes} from 'react-router-dom'

// lazy loading 
const Login =lazy(()=>import('./components/User/Login/Login')) 
const Signup =lazy(()=>import('./components/User/Signup/Signup.jsx')) ;
const AdminLogin= lazy(()=>import('./components/Admin/Login/Login.jsx'))
const AddUser =lazy(()=>import('./components/Admin/AddUser/AddUser.jsx'))
const EditUser =lazy(()=>import('./components/Admin/EditUser/EditUser.jsx'))



// Checking user exists in redux or not
function App() {
const user= useSelector((state)=>{
  return state.user
})
const admin=useSelector((state)=>{
  return state.admin
})


  return (
    <BrowserRouter>
    <Routes>
     

       <Route path='/login' element={!user.value?<Login/>:<Navigate to='/' />}/>
      <Route path='/signup' element={! user.value?<Signup/>:<Navigate to='/' />}/>
      <Route path='/'  element={user.value? <Home/>:<Navigate to='/login'/>}/>
      <Route path='/profile' element={user.value?<Profile/>:<Navigate to='/login'/> } />
      <Route path='/admin/login' element={ admin.length>0?<Navigate to='/admin/dashboard'/>:<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={admin.length>0?<AdminHome/>:<Navigate to='/admin/login' />}/>
      <Route path='/admin/add' element={admin.length>0?<AddUser/>:<Navigate to='/admin/login' />}/>
      <Route path='/admin/edit' element={admin.length>0?<EditUser/>:<Navigate to='/admin/login' />}/>


    </Routes>
    </BrowserRouter>

  );
}

export default App;
