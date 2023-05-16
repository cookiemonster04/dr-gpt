import React from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import logo from "../../assets/logo.png";
import "./Navbar.css";

export default function Navbar({ handleTheme, getTheme, user }) {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
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
              <>
                <a href="/profile" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Profile</a>
                <a href="/logout" className="text-gray-900 dark:text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Log out</a>
              </>
            )}
            {!user && (
              <>
                <a href="/login" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                <a href="/signup" className="text-gray-900 dark:text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Signup</a>
              </>
            )}
            </div>
          </div>
      </nav>
    </header>
  );
}
