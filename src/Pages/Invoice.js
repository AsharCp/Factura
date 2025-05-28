import React, { useState } from 'react'
import Template1 from '../Components/Template1'
import Template2 from '../Components/Template2';



const Invoice = () => {

    const [isBasic,setIsBasic] = useState(false);
    const handleBasic = () =>{
        setIsBasic(true)
    }
    const handleStandard = () =>{
        setIsBasic(false)
    }
  return (
    <div className='w-full flex justify-center flex-col gap-12 p-4 text-xl'>
        <div className='flex item-center justify-center flex-row gap-4'>
            <button onClick={handleBasic}><div className='bg-green-500 text-white px-8 py-2 rounded'>Basic</div></button>
            <button onClick={handleStandard}><div className='bg-red-500 text-white px-8 py-2 rounded' >Standard</div></button>
        </div>
        <div className='bg-gray-100'>
            {isBasic?<Template1/>:<Template2/>}
        </div>
        
        
    </div>
  )
}

export default Invoice