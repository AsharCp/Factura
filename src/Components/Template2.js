// src/App.js
import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js'; // Import html2pdf.js

function Template2() {
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, description: '', rate: 0, qty: 0, amount: 0 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);

  // Create a ref for the invoice content
  const invoiceRef = useRef(null);

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { id: Date.now(), description: '', rate: 0, qty: 0, amount: 0 }]);
  };

  const handleDeleteItem = (id) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setInvoiceItems(invoiceItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: parseFloat(value) || 0 };
        updatedItem.amount = updatedItem.rate * updatedItem.qty;
        return updatedItem;
      }
      return item;
    }));
  };

  const subTotal = invoiceItems.reduce((acc, item) => acc + item.amount, 0);
  const grandTotal = subTotal - discount + tax + shipping;

  const handleDownloadPdf = () => {
    if (invoiceRef.current) {
      const element = invoiceRef.current;
      const opt = {
        margin:       0.5, // inches
        filename:     'invoice.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true }, // Increased scale for better quality
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div
        ref={invoiceRef} // Attach the ref to the element you want to convert to PDF
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8"
      >
        {/* Company Info */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Company Name</h1>
          <p className="text-gray-600">Location, Country</p>
        </div>

        {/* Invoice Details & Bill From/To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Bill From</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Bill From"
            ></textarea>

            <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Bill To</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Bill To"
            ></textarea>
          </div>

          <div className="text-right">
            <div className="mb-2">
              <span className="font-semibold text-gray-700 mr-2">Invoice Number</span>
              <input
                type="text"
                className="w-40 p-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Invoice No"
              />
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700 mr-2">Date</span>
              <input
                type="date"
                className="w-40 p-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <span className="font-semibold text-gray-700 mr-2">Due Date</span>
              <input
                type="date"
                className="w-40 p-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="mb-8">
          <div className="bg-black text-white p-2 rounded-t-lg grid grid-cols-12 gap-4 text-sm font-semibold">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-right">Rate (₹)</div>
            <div className="col-span-2 text-right">Qty</div>
            <div className="col-span-2 text-right">Amount (₹)</div>
          </div>
          {invoiceItems.map(item => (
            <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-2 border-b border-gray-200 text-sm">
              <div className="col-span-6">
                <input
                  type="text"
                  className="w-full p-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
                  placeholder="Item Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="w-full p-1 border border-gray-200 rounded text-right focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={item.rate}
                  onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="w-full p-1 border border-gray-200 rounded text-right focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={item.qty}
                  onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                />
              </div>
              <div className="col-span-1 text-right">
                <span className="font-medium">₹ {item.amount.toFixed(2)}</span>
              </div>
              <div className="col-span-1 text-right">
                <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddItem}
            className="mt-4 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            New Item
          </button>
        </div>

        {/* Invoice Summary */}
        <div className="flex justify-end mb-8">
          <div className="w-full md:w-1/2 lg:w-1/3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">SubTotal :</span>
              <span className="font-bold text-lg">₹ {subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Discount</span>
              <input
                type="number"
                className="w-24 p-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tax</span>
              <input
                type="number"
                className="w-24 p-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={tax}
                onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Shipping</span>
              <input
                type="number"
                className="w-24 p-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={shipping}
                onChange={(e) => setShipping(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
              <span className="font-bold text-xl text-gray-800">Grand Total :</span>
              <span className="font-bold text-2xl text-gray-800">₹ {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div> {/* End of invoiceRef div */}

      {/* Download Button (outside the ref to avoid being part of the PDF) */}
      <div className="text-center mt-8">
        <button
          onClick={handleDownloadPdf} // Call the download function
          className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default Template2;