import React, { useState } from 'react'
import Template1 from '../Components/Template1'
import Template2 from '../Components/Template2';
import Template3 from '../Components/Template3';



const Invoice = () => {

    const [isBasic,setIsBasic] = useState(1);
    const handleOne = () =>{
        setIsBasic(1)
    }
    const handleTwo = () =>{
        setIsBasic(2)
    }
    const handleThree = () =>{
        setIsBasic(3)
    }
  return (
    <div className='w-full flex justify-center flex-col gap-12 p-4 text-xl'>
        <div className='flex item-center justify-center flex-row gap-4'>
            <button onClick={handleOne}><div className='bg-green-500 text-white px-8 py-2 rounded'>Template 1</div></button>
            <button onClick={handleTwo}><div className='bg-red-500 text-white px-8 py-2 rounded' >Template 2</div></button>
            <button onClick={handleThree}><div className='bg-blue-500 text-white px-8 py-2 rounded' >Template 3</div></button>
        </div>
        <div className='bg-gray-100'>
            {isBasic===1?<Template1/>:isBasic===2?<Template2/>:<Template3/>}
        </div>
        
        
    </div>
  )
}

export default Invoice