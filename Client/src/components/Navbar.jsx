import React, { useContext, useState } from "react";
import logo from "../assets/authentication.png";
import arrow from "../assets/right-arrow.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);

  // Controls dropdown on mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sendVerificationOtp = async () => {
    // This line is mandatory if you want to send cookies
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        setIsMenuOpen(false);
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        setIsMenuOpen(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="w-full py-5 flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20">
          <img
            src={logo}
            alt="AuthNova"
            className="w-5 h-5 object-contain"
          />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Auth<span className="text-indigo-600">Nova</span>
        </h1>
      </div>

      {/* User / Login */}
      {userData ? (
        <div className="relative group">

          {/* Profile Avatar */}
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center
            rounded-full bg-linear-to-br from-indigo-500 to-purple-600
            text-white font-semibold text-sm
            shadow-md shadow-indigo-500/20
            cursor-pointer
            transition-all duration-300
            group-hover:scale-105 group-hover:shadow-lg"
          >
            {userData.name[0].toUpperCase()}
          </div>

          {/* Dropdown */}
          <div
            className={`absolute right-0 top-full pt-3 z-50
            ${isMenuOpen ? "block" : "hidden"}
            md:group-hover:block`}
          >
            <div
              className="w-48 overflow-hidden
              rounded-xl border border-slate-200
              bg-white shadow-xl shadow-slate-300/30"
            >

              {/* User Information */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {userData.name}
                </p>

                <p className="text-xs text-slate-500 truncate">
                  {userData.email}
                </p>
              </div>

              {/* Menu */}
              <ul className="p-1.5">

                {/* Verify Email */}
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="px-3 py-2.5 rounded-lg
                    text-sm font-medium text-indigo-600
                    cursor-pointer
                    transition-colors duration-200
                    hover:bg-indigo-50"
                  >
                    Verify Email
                  </li>
                )}

                {/* Logout */}
                <li
                  onClick={logout}
                  className="px-3 py-2.5 rounded-lg
                  text-sm font-medium text-slate-600
                  cursor-pointer
                  transition-colors duration-200
                  hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </li>

              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Login Button */
        <button
          className="group flex items-center gap-2 px-4 py-2.5
          rounded-xl border border-gray-200 bg-white
          text-sm sm:text-base font-medium text-gray-700
          shadow-sm transition-all duration-300
          hover:border-indigo-200 hover:bg-indigo-50
          hover:text-indigo-600 hover:shadow-md cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login

          <img
            src={arrow}
            alt=""
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      )}
    </nav>
  );
}

export default Navbar;