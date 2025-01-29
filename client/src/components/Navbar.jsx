import React, { useState } from "react";
import { Menu, X, Home, ShoppingBag, Users, Image, Mail, Baby } from "lucide-react";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img className="w-32 md:w-[12rem]" src={logo} alt="Logo" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold">
          <li className="flex items-center gap-2 hover:text-gray-900 cursor-pointer transition">
            <Home size={18} /> Home
          </li>
          <li className="flex items-center gap-2 hover:text-gray-900 cursor-pointer transition">
            <ShoppingBag size={18} /> Mens Wear
          </li>
          <li className="flex items-center gap-2 hover:text-gray-900 cursor-pointer transition">
            <Users size={18} /> Ladies Wear
          </li>
          <li className="flex items-center gap-2 hover:text-gray-900 cursor-pointer transition">
            <Baby size={18} /> Kids Wear
          </li>
          <li className="flex items-center gap-2 hover:text-gray-900 cursor-pointer transition">
            <Image size={18} /> Gallery
          </li>
          <li className="flex items-center gap-2 hover:text-gray-900 cursor-pointer transition">
            <Mail size={18} /> Contact Us
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-16">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-semibold">
            <li className="hover:text-gray-900 cursor-pointer transition">Home</li>
            <li className="hover:text-gray-900 cursor-pointer transition">Mens Wear</li>
            <li className="hover:text-gray-900 cursor-pointer transition">Ladies Wear</li>
            <li className="hover:text-gray-900 cursor-pointer transition">Kids Wear</li>
            <li className="hover:text-gray-900 cursor-pointer transition">Gallery</li>
            <li className="hover:text-gray-900 cursor-pointer transition">Contact Us</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
