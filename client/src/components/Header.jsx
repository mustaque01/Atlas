import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X, User, LogOut, Settings, CreditCard } from 'lucide-react';
import atlas2 from '../assets/atlas2.png';

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);

    // Check authentication status on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setIsProfileDropdownOpen(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        // Add redirect to home page
        window.location.href = '/';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center">
                                <img src={atlas2} alt="Atlas Loan" className="w-32 h-8 md:w-40 md:h-10" />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link 
                                to="/" 
                                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                            >
                                Home
                            </Link>
                            <Link 
                                to="/about" 
                                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                            >
                                About
                            </Link>
                            <Link 
                                to="/contact" 
                                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                            >
                                Contact
                            </Link>
                            {isAuthenticated && (
                                <>
                                    <Link 
                                        to="/dashboard" 
                                        className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link 
                                        to="/loans" 
                                        className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                                    >
                                        Loans
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Desktop Auth Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {!isAuthenticated ? (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        to="/login"
                                        className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-rose-500/20"
                                    >
                                        Get Started 
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                        className="flex items-center space-x-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg px-4 py-2 transition-colors duration-200"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-white">
                                                {user?.firstName || 'User'}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {user?.email || 'user@atlas.com'}
                                            </p>
                                        </div>
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-xl border border-zinc-700 py-2">
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <User className="w-4 h-4" />
                                                Profile
                                            </Link>
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <CreditCard className="w-4 h-4" />
                                                My Loans
                                            </Link>
                                            <Link
                                                to="/settings"
                                                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </Link>
                                            <hr className="my-2 border-zinc-700" />
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors w-full text-left"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-300 hover:text-white p-2"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-zinc-800">
                        <div className="px-6 py-4 space-y-4">
                            <Link 
                                to="/" 
                                className="block text-gray-300 hover:text-white transition-colors py-2"
                                onClick={closeMenu}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/about" 
                                className="block text-gray-300 hover:text-white transition-colors py-2"
                                onClick={closeMenu}
                            >
                                About
                            </Link>
                            <Link 
                                to="/contact" 
                                className="block text-gray-300 hover:text-white transition-colors py-2"
                                onClick={closeMenu}
                            >
                                Contact
                            </Link>
                            
                            {isAuthenticated ? (
                                <>
                                    <Link 
                                        to="/dashboard" 
                                        className="block text-gray-300 hover:text-white transition-colors py-2"
                                        onClick={closeMenu}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link 
                                        to="/loans" 
                                        className="block text-gray-300 hover:text-white transition-colors py-2"
                                        onClick={closeMenu}
                                    >
                                        Loans
                                    </Link>
                                    <hr className="border-zinc-700" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <hr className="border-zinc-700" />
                                    <Link
                                        to="/login"
                                        className="block text-gray-300 hover:text-white transition-colors py-2"
                                        onClick={closeMenu}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-3 rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-200 font-medium"
                                        onClick={closeMenu}
                                    >
                                        Get Started 
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer to prevent content from hiding behind fixed header */}
            <div className="h-16"></div>

            {/* Close dropdown when clicking outside */}
            {isProfileDropdownOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileDropdownOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Header;

