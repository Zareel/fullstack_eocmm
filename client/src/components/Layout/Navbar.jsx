import axios from "axios";
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {auth, setAuth} = useContext(AuthContext)

  // logout
  const handleLogout = async()=>{
    try{
      const {data} = await axios.post("http://localhost:4000/api/v1/auth/logout")
      if(data.success){
        toast.success(data.message)
        setAuth({
          ...auth,
          user:null,
          token:""
        })
        localStorage.removeItem("auth")

      }

    }catch(error){
      console.log(error)
      toast.error(`Something went wrong while logging out`)
    }
  }

  return (
    <nav className="bg-linear-to-r from-[#A7A7DB] to-stone-400 shadow-md ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center justify-center  w-12 h-12 rounded-full dark:bg-purple-600">
          <div className="text-4xl font-semibold text-[#100B54] font-mont">
            Marque
            <span className="text-5xl text-[#3226D4] -m-2 font-cursive font-bold">
              Z
            </span>
          </div>
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-[#100B54]  items-center text-lg font-semibold font-poppins">
          <NavLink
            to="/"
            className="hover:text-indigo-600 transition duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="about"
            className="hover:text-indigo-600 transition duration-300"
          >
            About
          </NavLink>
          <NavLink
            to="collection"
            className="hover:text-indigo-600 transition duration-300"
          >
            Collection
          </NavLink>
          <NavLink
            to="products"
            className="hover:text-indigo-600 transition duration-300"
          >
            Products
          </NavLink>
          <NavLink
            to="login"
            className="px-4 py-2 border border-[#100B54] text-[#100B54] rounded-lg hover:bg-[#110c52] hover:text-white transition duration-300"
          >
            Login
          </NavLink>
          <NavLink
            to="signup"
            className="px-4 py-2 bg-[#110c52] text-white rounded-lg hover:bg-[#3226D4] transition duration-300"
          >
            Signup
          </NavLink>
          <NavLink onClick={handleLogout}>LogOut </NavLink>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-4 text-gray-700 font-medium">
            <li>
              <a href="/" className="block hover:text-indigo-600">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="block hover:text-indigo-600">
                About
              </a>
            </li>
            <li>
              <a href="/collection" className="block hover:text-indigo-600">
                Collection
              </a>
            </li>
            <li>
              <a href="/login" className="block hover:text-indigo-600">
                Login
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="block bg-indigo-600 text-white text-center py-2 rounded-lg"
              >
                Signup
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
