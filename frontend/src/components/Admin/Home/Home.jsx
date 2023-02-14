import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import './home.css'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { removeAdmin } from '../../../store';
import axios from '../../../axios'
import { useDispatch } from 'react-redux';

function Home() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [cookies, setCookie, removeCookie] = useCookies([])
	const [userData, setUserData] = useState([]) // to store whole user's data
	const [search, setSearch] = useState('') 


	//using useEffect to load userData on First load

	useEffect(() => {    
		fetchUserData()
	}, [navigate])

	// Fetch all userData
	const fetchUserData = async () => {

		const { data } = await axios.get('/admin/dashboard', {}, { withCredentials: true })
		if (data.userData) {
			setUserData(data.userData)
		}

	}


	const deleteUser = async (id) => {
		try {
			const { data } = await axios.delete('/admin/deleteUser', {
				data: {
					data: id
				}
			}, { withCredentials: true })
			setUserData(userData.filter((user) => {
				return user.id !== id
			}))

			fetchUserData()


		} catch (error) {
			console.log(error)
		}
	}

	// function to fetch user Details based on Search
	const handleSearch = async () => {
		const { data } = await axios.get('/admin/dashboard', {
			params: {
				data: search
			}
		}, { withCredentials: true })

		if (data.userData) {
			setUserData(data.userData)
		}
	}

	//Function to edit user
	const handleUserEdit=(user)=>{

		   navigate('/admin/edit',{state:{user}})
	}

	// admin logout
	const logout = () => {

		dispatch(removeAdmin())
		removeCookie("jwtAd", { path: '/' })
		
		navigate('/admin/login')
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
					<div>
						<input type="text" name="" id="" placeholder='search user' onChange={(e) => setSearch(e.target.value)} />
						<button className='src-btn' onClick={handleSearch}>search</button>
					</div>
				</div>
				<Table bordered size="sm" className='w-75  ms-5'>
					<thead>
						<tr>
							<th></th>
							<th>Profile Image</th>
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
									<td><img src={user.image} width={50} height={50} alt="profile" /></td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td className='d-flex justify-content-between'>
										<span className='text-success' onClick={()=>handleUserEdit(user)}><i className="fas fa-edit"></i></span>
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