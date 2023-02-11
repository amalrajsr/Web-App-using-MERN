import React from 'react'

function AddUser() {
  return (
    <div className='login_container'>
    <div className='login_form_container'>
      <div className='left'>
        <form className='form_container' method='post' onSubmit={handleSubmit}>
          {error && <div className='error'><span>{error}</span></div> }
          <h1>Add User</h1>
          <input
            type="name"
            placeholder="name"
            name="name" 
            className='input'
            required
            onChange={(e)=>setName(e.target.value)}

          />
          <input
            type="email"
            placeholder="Email"
            name="email" 
            className='input'
            required
            onChange={(e)=>setEmail(e.target.value)}

          />
          <input
            type="password"
            placeholder="Password"
            name="password"
             required
            className='input'
            onChange={(e)=>setPass(e.target.value)}
          />
          <button type="submit" className='green_btn'>
            Add User
          </button>
        </form>
      </div>
      <div className='right'>
        <Link to="/admin/dashboard">
          <button type="button" className='white_btn'>
          back to home
          </button>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default AddUser