import React from "react";
import Imageimg from "../assets/loginimg.png";
import logo from "../assets/Logo.png";

const Login = () => {
  return (
    <div className="flex overflow-y-hidden  min-h-screen bg-gray-100">
      {/* Left Panel: Image Section */}
      <div className="flex-1 bg-blue-500 relative  hidden lg:block">
        <img className="w-[32rem]  object-cover" src={Imageimg} alt="Login" />
      </div>

      {/* Right Panel: Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-6 lg:p-12">
        <img className="w-60 mb-6" src={logo} alt="Logo" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Login / Signup</h2>
        <p>Join us now to be a part of Fashion family.</p>
        <div className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition duration-300">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
