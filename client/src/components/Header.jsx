import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import atlas2 from '../assets/atlas2.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage or session
    const userToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!userToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="border-zinc-800 bg-black/50 backdrop-blur-lg w-full z-50 sticky">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/">
              <img src={atlas2} alt="Logo" className="w-[200px] h-[70px] ml-10" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
              {isLoggedIn ? (
                <>
                  <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition-colors">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
                  <a href="/risk" className="text-gray-300 hover:text-white transition-colors">Risk Assessment</a>
                  <a href="/approval" className="text-gray-300 hover:text-white transition-colors">Approval</a>
                  <a href="/loan" className="text-gray-300 hover:text-white transition-colors">Loan</a>
                  <a href="/chatbot" className="text-gray-300 hover:text-white transition-colors">Chatbot</a>
                  <a href="/documentverification" className="text-gray-300 hover:text-white transition-colors">Document Verification</a>
                </>
              )}
            </div>
          </div>

          {!isLoggedIn ? (
            <a
              href="/PhoneVerification"
              className="w-[8rem] bg-emerald-500 px-2 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex justify-center items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-4" />
            </a>
          ) : (
            <a
              href="/dashboard"
              className="w-[8rem] bg-blue-500 px-2 py-2 rounded-lg hover:bg-blue-600 transition-colors flex justify-center items-center gap-2"
            >
              Dashboard
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
