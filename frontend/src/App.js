import Login from './components/User/Login/Login';
import Signup from './components/User/Signup/Signup';
import {Navigate, BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/User/Home/Home';
import AdminLogin from './components/Admin/Login/Login'
import AdminHome from './components/Admin/Home/Home'
import AddUser from './components/Admin/AddUser/AddUser'
import Profile from './components/User/Profile/Profile';
import EditUser from './components/Admin/EditUser/EditUser';
import { useSelector } from 'react-redux';

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
      {/* <Route path='/'  element={ <Home/>}/> */}

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
