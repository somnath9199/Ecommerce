import React, { useState } from "react";
import loginbg from "../assets/loginbg.svg";
import logo from "../assets/Logo.png";
import Loader from "../Loader/Loader";
import {useNavigate} from 'react-router-dom'
import { Toaster, toast } from "react-hot-toast";
import {Eye,EyeOff} from "lucide-react"
import axios from "axios";


const Login = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const[showPassword ,setShowPassword] =useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault(); 

    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await axios.post("/v2/api/Signin", { email, password });
      localStorage.setItem("token", response.data.token);
      setSuccessMessage("Login successful!");
      setTimeout(()=>{
        Navigate('/Home'); 
      },2000)
      return toast.success("Login successful!")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen bg-gray-50 absolute top-0 left-0 w-full z-50">
          <Loader />
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex min-h-screen bg-gray-50">
        <div className="hidden lg:flex w-1/2 items-center justify-center" style={{ backgroundColor: "#f3faff" }}>
          <img className="w-100" src={loginbg} alt="Login" />
        </div>

        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
          <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg text-center">
            <img src={logo} alt="Logo" className="w-32 mx-auto mb-6" />
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Login to continue</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                required
              />

              {/* Password Input with Eye Icon Inside */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {error && <p className="text-red-500 mt-5">{error}</p>}
            {successMessage && <p className="text-green-500 mt-5">{successMessage}</p>}

            <p className="text-gray-500 text-sm mt-5">
              Don't have an account?{" "}
              <a href="/" className="text-blue-500 font-medium hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
