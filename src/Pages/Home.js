import React from 'react';
import { useState } from 'react'; // Using useState to simulate navigation for now
import { Link } from 'react-router-dom';

// Header Component


// Home Page Component
const Home = ({ onCreateInvoiceClick }) => {
  return (
    <main className="flex-grow bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Effortless <span className="text-blue-600">Invoice Generation</span> for Your Business
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
              Streamline your billing process with professional, customizable invoices in minutes. Focus on what matters most: your business.
            </p>
            <Link to='/invoice'
              onClick={onCreateInvoiceClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Create Invoice Now
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Illustration/Image 1 */}
            <img
              src="https://placehold.co/600x400/A7F3D0/10B981?text=Invoice+Hero"
              alt="Invoice Generation Illustration"
              className="w-full max-w-md rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/A7F3D0/10B981?text=Invoice+Hero"; }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-12">Why Choose InvoicePro?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="bg-blue-100 p-4 rounded-full mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Professional Templates</h4>
              <p className="text-gray-600">Choose from a variety of modern, professional templates designed to impress your clients.</p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="bg-green-100 p-4 rounded-full mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Fast & Easy Creation</h4>
              <p className="text-gray-600">Generate invoices in just a few clicks, saving you valuable time and effort.</p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="bg-purple-100 p-4 rounded-full mb-6">
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9a2 2 0 00-2-2h-7m-2 2a2 2 0 012-2h7m-2 2v7m-7 4h4m-4-8h4m-4-8h4"></path></svg>
              </div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Secure & Reliable</h4>
              <p className="text-gray-600">Your data is safe with us. Enjoy peace of mind with our secure platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <ol className="space-y-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4 shadow-md">1</div>
                  <div>
                    <h5 className="text-2xl font-semibold text-gray-800 mb-2">Enter Details</h5>
                    <p className="text-gray-600">Simply input your client's information, itemized services, and pricing.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4 shadow-md">2</div>
                  <div>
                    <h5 className="text-2xl font-semibold text-gray-800 mb-2">Customize & Preview</h5>
                    <p className="text-gray-600">Choose a template, add your logo, and preview your invoice before finalizing.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4 shadow-md">3</div>
                  <div>
                    <h5 className="text-2xl font-semibold text-gray-800 mb-2">Download & Send</h5>
                    <p className="text-gray-600">Download your invoice as a PDF and send it directly to your clients.</p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="flex justify-center">
              {/* Illustration/Image 2 */}
              <img
                src="https://placehold.co/600x400/D1E7DD/28A745?text=Workflow+Illustration"
                alt="Workflow Illustration"
                className="w-full max-w-md rounded-xl shadow-2xl transform -rotate-3 hover:rotate-0 transition duration-500"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/D1E7DD/28A745?text=Workflow+Illustration"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
            Ready to Simplify Your Invoicing?
          </h3>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of businesses who trust InvoicePro for their billing needs. Get started today!
          </p>
          <Link to='/invoice'
            onClick={onCreateInvoiceClick}
            className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-4 px-12 rounded-full text-xl shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white"
          >
            Create Invoice Now
          </Link>
        </div>
      </section>
    </main>
  );
};



// Main App Component
const App = () => {
  // State to simulate navigation. In a real app, you'd use react-router-dom
  const [currentPage, setCurrentPage] = useState('home');

  const handleCreateInvoiceClick = () => {
    // In a real application, this would be `navigate('/invoice')` from react-router-dom
    setCurrentPage('invoice'); // Simulate navigating to the invoice page
    console.log("Navigating to Invoice Generation Page...");
    // You can add a message box here if needed, instead of console.log
    // For now, we'll just log and keep the home page displayed as per the request.
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* <Header /> */}
      {/* Only render Home page for now as requested */}
      {currentPage === 'home' && <Home onCreateInvoiceClick={handleCreateInvoiceClick} />}
      {/* In a complete app, you'd have routing like:
      <Routes>
        <Route path="/" element={<Home onCreateInvoiceClick={handleCreateInvoiceClick} />} />
        <Route path="/invoice" element={<InvoiceGeneratorPage />} />
        {/* Other routes }
      </Routes>
      */}
      {/* <Footer /> */}
    </div>
  );
};

export default App;
