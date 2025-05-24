import React from 'react'
import { useState } from 'react'

const Login = () => {
   
  const [clickSignUp, setClickSignUp] = useState(true)
  const handleChangeToSignup = () =>{
    setClickSignUp(false)
  }
  const handleChangeToLogin = ()=>{
    setClickSignUp(true)
  }

  return (
    <>
    {clickSignUp?
    <div className='md:w-full p-8 border flex flex-col justify-between items-center gap-2'>
        <div className='text-3xl font-bold font-mono'>LOGIN</div>
        <input className='md:w-4/5 text-xl border p-3 outline-none' type='text' placeholder='Email'/>
        <input className='md:w-4/5 text-xl border p-3 outline-none' type='text' placeholder='Password'/>
        <button className='md:w-3/5 bg-gray-300 p-3 w-5/6 font-bold'>SUBMIT</button>
        <button onClick={() => handleChangeToSignup()} className='md:w-3/5 bg-gray-300 p-3 w-5/6 font-bold'>SIGN UP?</button>
    </div>:

    <div className='md:w-full p-8 border flex flex-col justify-between items-center gap-2'>
        <div className='text-3xl font-bold font-mono'>SIGN UP</div>
        <input className='md:w-4/5 text-xl border p-3 outline-none' type='text' placeholder='Email'/>
        <input className='md:w-4/5 text-xl border p-3 outline-none' type='text' placeholder='Password'/>
        <button className='md:w-3/5 bg-gray-300 p-3 w-5/6 font-bold'>SUBMIT</button>
        <button onClick={()=> handleChangeToLogin()} className='md:w-3/5 bg-gray-300 p-3 w-5/6 font-bold'>LOGIN?</button>
    </div>}
    </>
  )
}

export default Login