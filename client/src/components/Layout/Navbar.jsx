import axios from "axios";
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../../context/AuthContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate()

  // logout
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/logout",
      );
      if (data.success) {
        toast.success(data.message);
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong while logging out`);
    }
  };

  return (
    <nav className="bg-linear-to-r from-[#A7A7DB] to-stone-400 shadow-md ">
      <div className="pl-36 pr-12  py-4 flex justify-between items-center">
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

          {auth?.user ? (
            <div className="flex h-full items-center gap-8">
            
                   <Menu as="div" className="relative inline-block">
            
            {/* Button */}
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 border-none outline-none">
              {"Hay" + " " + auth.user.name || "User"}
              <ChevronDownIcon className="size-5 text-gray-300" />
            </MenuButton>

            {/* Dropdown */}
            <MenuItems className="absolute border-none outline-none ">
              <div className="py-1 mt-6">
                
                <MenuItem>
                  {({ isActive }) => (
                    <NavLink to={`/dashboard/${auth.user.role === "admin" ? "admin" : "user"}`}
                     
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isActive ? "bg-white/10 text-white" : "text-gray-300"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  )}
                </MenuItem>

                <MenuItem>
                  {({ isActive }) => (
                    <button
                      onClick={() => navigate("/profile")}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isActive ? "bg-white/10 text-white" : "text-gray-300"
                      }`}
                    >
                      Profile
                    </button>
                  )}
                </MenuItem>

                <MenuItem>
                  {({ isActive }) => (
                    <NavLink to="/"
                      onClick={handleLogout}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isActive ? "bg-white/10 text-red-400" : "text-red-300"
                      }`}
                    >
                      Logout
                    </NavLink>
                  )}
                </MenuItem>

              </div>
            </MenuItems>
          </Menu>

              <NavLink
                to="about"
                className="hover:text-indigo-600 transition duration-300"
              >
                About
              </NavLink>
            
              
            
              <NavLink
                to="collection"
                className="hover:text-indigo-600 transition duration-300 "
              >
                Collection
              </NavLink>
              <NavLink
                to="products"
                className="hover:text-indigo-600 transition duration-300"
              >
                Products
              </NavLink>
            
            </div>
          ) : (
            <div className="flex gap-6 items-center justify-center w-full mr-20">
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
            </div>
          )}
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
