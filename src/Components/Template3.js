import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
// import Header from "./Components/Header";

function Template3() {
  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState("My Company");
  const [companyLocation, setCompanyLocation] = useState("City, Country");
  const [billFrom, setBillFrom] = useState("Sender Name\nAddress Line");
  const [billTo, setBillTo] = useState("Client Name\nAddress Line");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([{ name: "", rate: "", quantity: "" }]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [printing, setPrinting] = useState(false);

  const invoiceRef = useRef();

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", rate: "", quantity: "" }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const getTotal = () => {
    return items.reduce((total, item) => {
      const rate = parseFloat(item.rate) || 0;
      const qty = parseInt(item.quantity) || 0;
      return total + rate * qty;
    }, 0);
  };

  const getGrandTotal = () => {
    const total = getTotal();
    const d = parseFloat(discount) || 0;
    const t = parseFloat(tax) || 0;
    const s = parseFloat(shipping) || 0;
    return total - d + t + s;
  };

  const generatePDF = () => {
    setPrinting(true);
    setTimeout(() => {
      const opt = {
        margin: 0.5,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf()
        .set(opt)
        .from(invoiceRef.current)
        .save()
        .then(() => setPrinting(false));
    }, 100);
  };

  return (
    
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Invoice Generator</h1>

      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md">
        {!printing && (
          <div className="space-y-4 mb-6">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md w-full sm:w-auto"
                />
                <input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => handleChange(index, "rate", e.target.value)}
                  className="w-full sm:w-28 px-3 py-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => handleChange(index, "quantity", e.target.value)}
                  className="w-full sm:w-24 px-3 py-2 border rounded-md"
                />
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 self-start sm:self-center"
                  aria-label="Remove item"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              onClick={addItem}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block mx-auto sm:mx-0"
            >
              ➕ Add Item
            </button>
          </div>
        )}

        <div
          ref={invoiceRef}
          className="bg-white p-4 sm:p-6 rounded border"
          style={{ minWidth: "300px" }}
        >
          {/* Logo upload & display */}
          <div className="mb-4 text-center">
            {printing ? (
              logo ? (
                <img
                  src={logo}
                  alt="Company Logo"
                  className="mx-auto h-20 object-contain"
                />
              ) : (
                <p className="italic text-gray-400">No Logo</p>
              )
            ) : (
              <>
                {logo && (
                  <img
                    src={logo}
                    alt="Company Logo"
                    className="mx-auto h-20 object-contain mb-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLogo(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mx-auto"
                />
              </>
            )}
          </div>

          {/* Company name and location */}
          <div className="text-center mb-2">
            {printing ? (
              <>
                <h2 className="text-2xl font-bold">{companyName}</h2>
                <p className="text-sm">{companyLocation}</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="text-xl font-bold text-center w-full border-b pb-1 mb-1"
                />
                <input
                  type="text"
                  placeholder="Company Location"
                  value={companyLocation}
                  onChange={(e) => setCompanyLocation(e.target.value)}
                  className="text-sm text-center w-full border-b pb-1"
                />
              </>
            )}
          </div>

          {/* Bill from / to & Invoice info */}
          <div className="flex flex-col md:flex-row justify-between text-sm mb-4 gap-6">
            {/* Left side: Bill From & To */}
            <div className="space-y-4 flex-1">
              <div>
                <strong>Bill From:</strong>
                <br />
                {printing ? (
                  <p className="whitespace-pre-line">{billFrom}</p>
                ) : (
                  <textarea
                    rows={4}
                    placeholder="Sender's Name & Address"
                    value={billFrom}
                    onChange={(e) => setBillFrom(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                )}
              </div>

              <div>
                <strong>Bill To:</strong>
                <br />
                {printing ? (
                  <p className="whitespace-pre-line">{billTo}</p>
                ) : (
                  <textarea
                    rows={4}
                    placeholder="Recipient's Name & Address"
                    value={billTo}
                    onChange={(e) => setBillTo(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                )}
              </div>
            </div>

            {/* Right side: Invoice number, date, due date */}
            <div className="space-y-4 text-right flex-shrink-0 w-full md:w-auto">
              <div>
                <strong>Invoice #:</strong>
                <br />
                {printing ? (
                  <span>{invoiceNumber}</span>
                ) : (
                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full md:w-40 p-1 border rounded text-right"
                  />
                )}
              </div>
              <div>
                <strong>Date:</strong>
                <br />
                {printing ? (
                  <span>{invoiceDate}</span>
                ) : (
                  <input
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="w-full md:w-40 p-1 border rounded text-right"
                  />
                )}
              </div>
              <div>
                <strong>Due Date:</strong>
                <br />
                {printing ? (
                  <span>{dueDate}</span>
                ) : (
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full md:w-40 p-1 border rounded text-right"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Products table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Product</th>
                  <th className="p-2 border">Rate</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">
                      {printing ? (
                        item.name
                      ) : (
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleChange(idx, "name", e.target.value)}
                          className="w-full px-1 py-1 border rounded"
                        />
                      )}
                    </td>
                    <td className="p-2 border">
                      {printing ? (
                        `₹${item.rate}`
                      ) : (
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleChange(idx, "rate", e.target.value)}
                          className="w-full px-1 py-1 border rounded text-right"
                          min="0"
                        />
                      )}
                    </td>
                    <td className="p-2 border">
                      {printing ? (
                        item.quantity
                      ) : (
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleChange(idx, "quantity", e.target.value)}
                          className="w-full px-1 py-1 border rounded text-right"
                          min="0"
                        />
                      )}
                    </td>
                    <td className="p-2 border text-right">
                      ₹
                      {(parseFloat(item.rate || 0) * parseInt(item.quantity || 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals and charges */}
          <div className="mt-4 space-y-2 max-w-md ml-auto">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{getTotal().toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <label className="font-medium">Discount (₹):</label>
              {printing ? (
                <span>{parseFloat(discount).toFixed(2)}</span>
              ) : (
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-24 p-1 border rounded text-right"
                  min="0"
                />
              )}
            </div>

            <div className="flex justify-between items-center">
              <label className="font-medium">Tax (₹):</label>
              {printing ? (
                <span>{parseFloat(tax).toFixed(2)}</span>
              ) : (
                <input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                  className="w-24 p-1 border rounded text-right"
                  min="0"
                />
              )}
            </div>

            <div className="flex justify-between items-center">
              <label className="font-medium">Shipping (₹):</label>
              {printing ? (
                <span>{parseFloat(shipping).toFixed(2)}</span>
              ) : (
                <input
                  type="number"
                  value={shipping}
                  onChange={(e) => setShipping(e.target.value)}
                  className="w-24 p-1 border rounded text-right"
                  min="0"
                />
              )}
            </div>

            <div className="flex justify-between font-bold border-t border-gray-400 pt-2 text-lg">
              <span>Grand Total:</span>
              <span>₹{getGrandTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Download PDF button */}
        {!printing && (
          <button
            onClick={generatePDF}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 block mx-auto"
          >
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}

export default Template3;
