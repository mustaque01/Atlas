import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import atlas2 from '../assets/atlas2.png';

const Header = () => {
  return (
    <nav className="border-zinc-800 bg-gray-900 bg-opacity-50 sticky top-0 left-0 w-full z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto  py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation Links Container */}
          <div className="flex items-center justify-between md:ml-5">
            {/* Logo */}
            <Link to="/">
              <img src={atlas2} alt="Logo" className="w-[200px] h-[70px]" />
            </Link>
            </div>
            {/* Navigation Links (Hidden on mobile, visible on medium screens and up) */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
           
          </div>

          {/* Get Started Button */}
          <div className="hidden md:flex items-center mr-5">
            <Link
              to="/PhoneVerification"
              className="w-[10rem] bg-rose-400 px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex justify-center items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button (visible on small screens) */}
          <div className="md:hidden flex items-center">
            <Link
              to="/PhoneVerification"
              className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex justify-center items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Links (for small screens) */}
        <div className="md:hidden flex flex-col items-center gap-4 py-4">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

