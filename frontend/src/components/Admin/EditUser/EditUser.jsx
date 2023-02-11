import React from 'react'

function EditUser({name,setEditUserData}) {
  return (
    <><input type="text" name="" id="" value={name} onChange={(e)=>setEditUserData(e.target.value)} /></>
  )
}

export default EditUser