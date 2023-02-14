import React from 'react'

function Input({type,data,changeData}) {

    const handleChange=(e)=>{
        changeData(e.target.value)
    }
  return (
    <>
        <input
            type={type}
            placeholder={type}
            name={type}
            value={data}
            required
            className='input'
            onChange={handleChange}
          />
    </>
  )
}

export default Input