import React from 'react'
import Login from '../Components/Login'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <div className='w-5/6 gap-8 p-4 bg-white flex flex-col items-center md:flex-row'>
           <div className='flex flex-col gap-4'>
             <div className=' w-1/2 h-full text-5xl font-bold'>Hello! Welcome to Reality</div>
             <Link to='/invoice' className='w-fit py-2 px-6 rounded text-white text-2xl font-bold bg-black'><button>Create factura</button></Link>
           </div>
           
           <div className='w-1/2 h-full flex items-center justify-center'><Login/></div>
        </div>
        
    </div>
  )
}

export default Home