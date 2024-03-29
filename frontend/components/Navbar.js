import React from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar({ handleTheme, getTheme, user }) {
  return (
    <div>
      <nav className="w-full fixed top-0 z-50">

      <div className="flex flex-wrap justify-between items-center mx-auto w-full sticky top-0 bg-white border-gray-200 rem-0.24 lg:px-6 py-2.5 dark:bg-gray-800">
            <NavLink to="/" className="site-title">
              <div className="grid gap-4 sm:grid-cols-2">
                <img
                  src={logo}
                  style={{ marginRight: "0.6rem", width: "3.6rem", height: "3.6rem" }}
                />
                <span className="self-center text-xl hidden md:flex font-semibold whitespace-nowrap dark:text-white ml-2">Vitawise</span>
              </div>
            </NavLink>

            <div className="flex items-center lg:order-2">
              {user && (
              <ul className="flex list-none space-x-4">
                <li className="list-none">
                  <NavLink to="/chat" className="dark:text-white" >Chat</NavLink>
                </li>
                <li className="list-none">
                  <NavLink to="/profile" className="dark:text-white" >Profile</NavLink>
                </li>
                <li className="list-none">
                  <NavLink to="/logout" className="dark:text-white mr-2">Logout</NavLink>
                </li>
              </ul>
            )}
            {!user && (
            <ul className="flex list-none space-x-4">
              <li className="list-none">
                <NavLink to="/login" className="dark:text-white">Login</NavLink>
                
              </li>
              <li className="list-none">
                <NavLink to="/signup" className="dark:text-white mr-2">Signup</NavLink>
              </li>
            </ul>
            )}
            </div>
      </div>
    </nav>
    {/* </header> */}
    </div>
  );
}
