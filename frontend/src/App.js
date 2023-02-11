import Login from './components/User/Login/Login';
import Signup from './components/User/Signup/Signup';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/User/Home/Home';
import AdminLogin from './components/Admin/Login/Login'
import AdminHome from './components/Admin/Home/Home'
import AddUser from './components/Admin/AddUser/AddUser'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/'  element={<Home/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={<AdminHome/>}/>
      <Route path='/admin/add' element={<AddUser/>}/>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
