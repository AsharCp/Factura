import React from 'react'

const Signup = () => {
  return (
    <div className='w-80 p-8 border flex flex-col justify-between items-center gap-2'>
        <div className='text-3xl font-bold font-mono'>SIGN UP</div>
        <input className='text-xl border p-3 outline-none' type='text' placeholder='Email'/>
        <input className='text-xl border p-3 outline-none' type='text' placeholder='Password'/>
        <button className='bg-gray-300 p-3 px-28 font-bold'>Submit</button>
    </div>
  )
}

export default Signup