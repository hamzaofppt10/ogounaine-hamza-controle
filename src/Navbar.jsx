import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <>
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">MyApp</div>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
                    <li><Link to="/about" className="text-white hover:text-gray-200">About</Link></li>
                    <li><Link to="/services" className="text-white hover:text-gray-200">Services</Link></li>
                    <li><Link to="/contact" className="text-white hover:text-gray-200">Contact</Link></li>
                </ul>
            </div>
        </nav>
        </>
    );
};

export default Navbar;