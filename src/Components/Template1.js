import React, { useState , useRef } from 'react'
import { MdDeleteForever } from "react-icons/md";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Template1 = () => {

    const [rows,setRows] = useState([
        {Product:'', Rate:'',Quantity:'',Amount:''}
    ]);
    const [total,setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [noprint,setNoprint] = useState(true);
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

  const printRef = useRef();



const handleDownload = () => {
  setNoprint(false);
  setTimeout(() => {
    const element = printRef.current;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'a4',
      });

      // Calculate image dimensions to fit A4 landscape page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = {
        width: canvas.width,
        height: canvas.height
      };

      const aspectRatio = imgProps.width / imgProps.height;
      const imgHeight = pdfWidth / aspectRatio;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
      pdf.save('invoice.pdf');

      setNoprint(true);
    });
  }, 100);
};



    
  return (
    <div className='flex flex-col justify-center items-center w-full h-full gap-4'>
    <div ref={printRef} className='h-fit w-full sm:w-[80%] pt-20 flex items-center flex-col justify-center'>
         {/* Start of invoice geader section */}
         <div className='flex flex-col w-[80%] m-4 text-xs md:text-lg'>
            <div className='flex justify-center items-center flex-col'>
                <input type='text' placeholder='Company Name' spellCheck={false} className='h-16 bg-transparent outline-none w-[85%] bg-gray-50 rounded-lg py-2 text-4xl font-bold text-center'/>
                <input type='text' placeholder='Location, Country' spellCheck={false} className='bg-transparent outline-none w-[50%] bg-gray-50 text-md rounded-lg pb-4 pt-0 text-center'/>
            </div>

            <div className='flex justify-between font-semibold'>
                <label className='invisible'>Bill From</label>
                <label>Invoice Number</label>
            </div>
            <div className='flex justify-between gap-2 '>
                <input type='text' placeholder='Bill From' spellCheck={false} className='bg-transparent outline-none w-[85%] bg-gray-50 rounded-lg p-2 invisible'></input>
                <input type='text' placeholder='Invoice No' spellCheck={false} className='bg-transparent outline-none w-[15%] text-end bg-gray-50 rounded-lg p-2'></input>
            </div>
            <div className='flex justify-between font-semibold'>
                <label>Bill From</label>
                <label>Date</label>
            </div>
            <div className='flex justify-between gap-2'>
                <input type='text' placeholder='Bill From' spellCheck={false} className='bg-transparent outline-none w-[85%] bg-gray-50 rounded-lg p-2 '></input>
                <input type='text' placeholder='Date' spellCheck={false} className='flex bg-transparent outline-none w-[15%] text-end bg-gray-50 rounded-lg p-2 pr-0 text-right'></input>
            </div>
            <div className='flex justify-between font-semibold mt-2'>
                <label>Bill To</label>
                <label>Due Date</label>
            </div>
            <div className='flex justify-between gap-2'>
                <input type='text' placeholder='Bill To' spellCheck={false} className='bg-transparent outline-none w-[85%] bg-gray-50 rounded-lg p-2 '></input>
                <input type='text' placeholder='Due Date' spellCheck={false} className='bg-transparent outline-none w-[15%] text-end bg-gray-50 rounded-lg p-2'></input>
            </div>
         </div>

         {/* End of invoice geader section md:text-lg md:font-semibold */}
        <div className='flex flex-row w-[80%] text-xs bg-black text-white md:text-lg md:font-semibold items-center h-12 px-2 overflow'> 
            <div className='w-[50%]'>Description</div>
            <div className='w-[15%]'>Rate(₹)</div>
            <div className='w-[15%]'>Qty</div>
            <div className='w-[20%]'>Amount(₹)</div>
        </div>


        {rows.map((row,index)=>{
            const isEven = index%2;
            const rowBg = isEven ? "bg-gray-100" : "bg-gray-50";
            const inputBg = isEven ? "bg-gray-100" : "bg-gray-50";
            return(
            <div key={index} className={`w-[80%] text-sm flex flex-row h-12 ${rowBg}`}>
            <input type='text' defaultValue={index + 1+".  "} spellCheck={false} className={`outline-none w-[50%] pl-4 ${inputBg}`}></input>
            {/* <input type='text' defaultValue={index + 1+".  "} spellCheck={false} className={`outline-none w-[50%] pl-4 py-2 py-4 ${inputBg}`}></input> */}
            <input type='text' value={row.Rate} onChange={(e)=> handleInput(index,'Rate',e.target.value)} className={` outline-none w-[15%]  px-4 ${inputBg}`} ></input>
            <input type='text' value={row.Quantity} onChange={(e)=> handleInput(index,'Quantity',e.target.value)} className={`outline-none w-[15%] px-4 ${inputBg}`}></input>
            <div className={`w-[20%] px-4 flex items-center relative py-2 ${inputBg}`}>
               <div className="overflow-visible whitespace-nowrap">{row.Amount}</div>
               <MdDeleteForever className="hover:text-red-600 absolute right-2 top-1/2 -translate-y-1/2 size-6 cursor-pointer text-blue-950" onClick={() => handleDeleteRow(index)}/>
            </div>

            </div>
        
        )})}
    
        <div className='flex flex-col items-center w-full mt-2'>
            <div className='flex flex-row items-center justify-between w-[80%] mt-2'>
                {noprint ? (<button onClick={()=>handleAddRow()} className='border p-2 rounded hover:bg-green-600 hover:text-white'>New Item</button>):
                (<button onClick={()=>handleAddRow()} className='invisible border p-2 rounded hover:bg-green-600 hover:text-white'></button>)}
                
                <div className='text-xl text-right py-2 rounded font-semibold'>SubTotal : ₹ {total}</div>
            </div>
            
            <div className='flex flex-col items-end w-[80%] mt-2'>
                
                <div className='flex flex-row items-center gap-2'>
                    <label className=''>Discount</label>
                    <input type='number' placeholder='0' className='border w-40 outline-none h-12 pl-4' onChange={(e)=>{
                        setDiscount(handleExtras("Discount",e.target.value))}}></input>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <label className=''>Tax</label>
                    <input type='number' placeholder='0' className='w-40 border outline-none h-12 pl-4' onChange={(e)=>{
                        setTax(handleExtras("Tax",e.target.value))}}></input>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <label className=''>Shipping</label>
                    <input type='number' placeholder='0' className='w-40 border outline-none h-12 pl-4' onChange={(e)=>{
                        setShipping(handleExtras("Shipping",e.target.value))}}></input>
                </div>
                <div className='font-bold text-3xl h-12 flex items-center justify-center py-8'>Grand Total : ₹ {GrandTotal} </div>
                
            </div>            
        </div>

        
    </div>
    <div className='flex justify-center'>
        <button onClick={handleDownload} className="mt-4 w-fit bg-blue-600 text-white px-4 py-2 rounded"> Download </button>
    </div>
    
    </div>
  )

}

export default Template1