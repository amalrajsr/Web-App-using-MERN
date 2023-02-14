import Login from './components/User/Login/Login';
import Signup from './components/User/Signup/Signup';
import {Navigate, BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/User/Home/Home';
import AdminLogin from './components/Admin/Login/Login'
import AdminHome from './components/Admin/Home/Home'
import AddUser from './components/Admin/AddUser/AddUser'
import Profile from './components/User/Profile/Profile';
import { useSelector } from 'react-redux';

function App() {
const user= useSelector((state)=>{
  return state.user
})
const admin=useSelector((state)=>{
  return state.admin
})

console.log(user);
  return (
    <BrowserRouter>
    <Routes>
      {/* <Route path='/login' element={<Login/>} /> */}
      <Route path='/login' element={user.length<1?<Login/>:<Navigate to='/' />}/>
      <Route path='/signup' element={ user.length<1?<Signup/>:<Navigate to='/' />}/>
      <Route path='/'  element={user.length>0? <Home/>:<Navigate to='/login'/>}/>
      <Route path='/profile' element={user.length>0?<Profile/>:<Navigate to='/login'/> } />
      <Route path='/admin/login' element={ admin.length>0?<Navigate to='/admin/dashboard'/>:<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={admin.length>0?<AdminHome/>:<Navigate to='/admin/login' />}/>
      <Route path='/admin/add' element={admin.length>0?<AddUser/>:<Navigate to='/admin/login' />}/>

    </Routes>
    </BrowserRouter>

  );
}

export default App;
