import React from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar({ handleTheme, getTheme, user }) {
  return (
    <div>
      <nav class="w-full fixed top-0 z-50">

      <div className="flex flex-wrap justify-between items-center mx-auto w-full sticky top-0 bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <NavLink to="/" className="site-title">
              <div className="grid gap-4 sm:grid-cols-2">
              <img
                src={logo}
                style={{ marginRight: "10px", width: "60px", height: "60px" }}
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Vitawise</span>
              </div>
            </NavLink>

            <div className="flex items-center lg:order-2">
              {user && (
              <ul class="flex list-none space-x-4">
                <li class="list-none">
                  <NavLink to="/profile" className="dark:text-white" >Profile</NavLink>
                </li>
                <li class="list-none">
                  <NavLink to="/logout" className="dark:text-white">Logout</NavLink>
                </li>
              </ul>
            )}
            {!user && (
            <ul class="flex list-none space-x-4">
              <li class="list-none">
                <NavLink to="/login" className="dark:text-white">Login</NavLink>
                
              </li>
              <li class="list-none">
                <NavLink to="/signup" className="dark:text-white">Signup</NavLink>
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