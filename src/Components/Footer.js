const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Company Info */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">InvoicePro</h4>
          <p className="text-sm">
            Your trusted partner for professional and efficient invoice generation.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition duration-300">Home</a></li>
            <li><a href="#" className="hover:text-white transition duration-300">Features</a></li>
            <li><a href="#" className="hover:text-white transition duration-300">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition duration-300">Contact Us</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Contact Us</h4>
          <p className="text-sm">Email: info@invoicepro.com</p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
          <p className="text-sm">Address: 123 Invoice St, Suite 456, Business City, BC 12345</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} InvoicePro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer