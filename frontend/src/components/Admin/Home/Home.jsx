import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './home.css'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import EditUser from '../EditUser/EditUser';
import axios from '../../../axios'

function Home() {
	const navigate = useNavigate()
	const [cookies, setCookie, removeCookie] = useCookies([])
	const [userData, setUserData] = useState([]) // to store whole user's data
	const [search, setSearch] = useState('') // to store search value
	const [editUserData, setEditUserData] = useState('')

	useEffect(() => {                         //using useeffect to load userData on First load
		const verifyAdmin = async () => {
			if (!cookies.jwtAd) {
				navigate('/admin/login')
			} else {
				const { data } = await axios.get('/admin/dashboard', {
					params: {
						data: search
					}
				}, { withCredentials: true })

				if (data.userData) {
					setUserData(data.userData)
				}
			}
		}

		verifyAdmin()
	}, [cookies, navigate, search])


	const logout = () => {

		removeCookie("jwtAd", { path: '/' })
		navigate('/admin/login')
	}

	const deleteUser = async (id) => {
		try {
			const {data}=await axios.delete('/admin/deleteUser', {
				data: {
					data: id
				}
			}, { withCredentials: true })
  
			console.log(data)
			setUserData(userData.filter((user)=>{
				return user.id !==id
			})) 

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className='main_container'>
				<nav className='navbar'>
					<h1>Welcome Back Admin</h1>
					<div>
						<button className='white_btn' onClick={logout}>Logout</button>
					</div>
				</nav>
			</div>

			<div className='mt-5'>
				<div className='d-flex justify-content-between w-75 ms-5 heading'>
					<div><span><h4>USER LIST</h4></span></div>
					<div><Link to='/admin/add'><button className='add_btn'>Add</button></Link></div>
					<div><input type="text" name="" id="" placeholder='search' onChange={(e) => setSearch(e.target.value)} /></div>
				</div>
				<Table striped bordered hover size="sm" className='w-75  ms-5'>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{userData.map((user, i) => {
							return (
								<tr key={user._id}>
									<td>{i + 1}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td className='d-flex justify-content-between'>
										<span className='text-success' onClick={() => setEditUserData(user._id)}><i className="fas fa-edit"></i></span>
										<span className='text-danger' onClick={() => deleteUser(user._id)}><i className="fas fa-trash"></i></span>
									</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</div>
		</>
	)
}

export default Home