import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";

const Invoice = () => {

    const [rows,setRows] = useState([
        {Product:'', Rate:'',Quantity:'',Amount:''}
    ]);
    const [total,setTotal] = useState(0);
    // const [discount,setDiscount] = useState(0);
    // const [tax,setTax] = useState(0);
    // const [final,setFinal] = useState(total);

    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(0);
    const GrandTotal = total-discount+tax+shipping


    const handleAddRow=()=>{
        // setgrandTotal(total)
        setRows([...rows,{Product:'', Rate:'',Quantity:'',Amount:'',Total:''}])

    }
    // Function for handle deleting rows
    const handleDeleteRow=(index)=>{
        if (rows.length > 1)
        {
            const newRows = rows.filter((_, i) => i !== index);
            const newTotal = newRows.reduce((sum, row) => {
                return sum + (parseFloat(row.Amount) || 0);
            }, 0);
            setTotal(newTotal)
            setRows(rows.slice(0, -1))
            
        }}
    // Function for handling input values
    const handleInput = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;

        const rate = parseFloat(newRows[index].Rate) || 0;
        const quantity = parseFloat(newRows[index].Quantity) || 0;
        newRows[index].Amount = rate * quantity;

        const newTotal = newRows.reduce((sum, row) => {
            const amount = parseFloat(row.Amount) || 0;
            return sum + amount;
    }, 0);

    setRows(newRows);
    setTotal(newTotal);
    };

    // const handleDiscount = (Discount) =>{
    //     setFinal(total)
    //     setFinal(final-Discount)
    //     setDiscount(Discount)
    // }
    // const handleTax = (Tax) =>{
    //     setFinal(total)
    //     setTax(Tax)
    //     setFinal(final+Tax)
    // }
    const handleExtras = (id,Value) =>{
        if(id==="Discount")
        {
            return parseFloat(Value) || 0;
        }
        if(id==="Tax")
        {
            console.log(Value);
            return parseFloat(Value) || 0;
            
        }
        if(id==="Shipping")
        {
            return parseFloat(Value) || 0;
        }
        
    }

    
  return (
    <div className='w-full h-screen flex items-center flex-col justify-center'>
        <div className='flex flex-row w-4/5 text-xs md:text-lg md:font-semibold bg-blue-950 text-white'>
            <div className='w-3/6 py-2 ml-2'>Description</div>
            <div className='w-1/6 py-2'>Rate</div>
            <div className='w-1/6 py-2'>Quantity</div>
            <div className='w-1/6 py-2'>Amount</div>
        </div>

        {rows.map((row,index)=>(
            <div key={index} className='w-4/5 text-md flex flex-row'>
            <input type='text' defaultValue={index + 1+".  "} spellCheck={false} className='border outline-none w-3/5 h-12 px-4'></input>
            <input type='text' value={row.Rate} onChange={(e)=> handleInput(index,'Rate',e.target.value)} className='border outline-none w-1/5 h-12 px-4' ></input>
            <input type='text' value={row.Quantity} onChange={(e)=> handleInput(index,'Quantity',e.target.value)} className='border outline-none w-1/5 h-12 px-4'></input>
            <div className="border w-1/5 h-12 px-4 flex items-center relative">
               <div className="overflow-visible whitespace-nowrap">{row.Amount}</div>
               <MdDeleteForever className="hover:text-red-600 absolute right-2 top-1/2 -translate-y-1/2 size-6 cursor-pointer text-blue-950" onClick={() => handleDeleteRow(index)}/>
            </div>

            </div>
            
        
        ))}
    
        <div className='flex flex-col items-center w-full mt-2'>
            <div className='flex flex-row items-center justify-between w-4/5 mt-2'>
                <button onClick={()=>handleAddRow()} className='border p-2 rounded hover:bg-green-600 hover:text-white'>New Item</button>
                <div className='border text-right px-12 py-2 rounded font-semibold'>Total : ₹ {total}</div>
            </div>
            
            <div className='flex flex-col items-end w-4/5 mt-2'>
                
                <div className='flex flex-row items-center gap-2'>
                    <label className=''>Discount</label>
                    <input type='number' placeholder='Discount' className='border w-40 outline-none h-12 pl-4' onChange={(e)=>{
                        setDiscount(handleExtras("Discount",e.target.value))}}></input>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <label className=''>Tax</label>
                    <input type='number' placeholder='Tax' className='w-40 border outline-none h-12 pl-4' onChange={(e)=>{
                        setTax(handleExtras("Tax",e.target.value))}}></input>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <label className=''>Shipping</label>
                    <input type='number' placeholder='Shipping' className='w-40 border outline-none h-12 pl-4' onChange={(e)=>{
                        setShipping(handleExtras("Shipping",e.target.value))}}></input>
                </div>
                <div className='border h-12 flex items-center justify-center px-12'>Grand Total : ₹ {GrandTotal} </div>
            </div>            
        </div>
        
    </div>
  )
}
// {discount!==0?total-discount:total}
export default Invoice