import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/authentication.png";
import user from "../assets/user.png";
import mail from "../assets/mail.png";
import lock from "../assets/lock.png";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from 'react-toastify';

function Login() {

  const navigate = useNavigate()
  const {backendUrl, setIsLoggedin, isLoggedin, getUserData} = useContext(AppContext)

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()

      axios.defaults.withCredentials = true

      if(state === 'Sign Up'){

        const {data} = await axios.post(backendUrl + '/api/auth/register', {
          name,
          email,
          password
        })

        if(data.success){
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(data.message)
        }

      }else{

        const {data} = await axios.post(backendUrl + '/api/auth/login', {
          email,
          password
        })

        if(data.success){
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-100 via-slate-50 to-indigo-100 px-6 sm:px-10 lg:px-16">

      {/* Logo */}
      <div onClick={() => navigate('/')} className="flex items-center gap-2.5 pt-5 cursor-pointer">
        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20">
          <img
            src={logo}
            alt="AuthNova"
            className="w-5 h-5 object-contain"
          />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Auth<span className="text-indigo-600">Nova</span>
        </h1>
      </div>

      {/* Authentication Card */}
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-10">

        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-2xl shadow-slate-300/40">

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {state === "Sign Up"
                ? "Create your account"
                : "Login to your account!"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="mt-7 space-y-4">

            {/* Full Name */}
            {state === "Sign Up" && (
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
                <img
                  src={user}
                  alt=""
                  className="h-5 w-5 object-contain opacity-60"
                />

                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
              <img
                src={mail}
                alt=""
                className="h-5 w-5 object-contain opacity-60"
              />

              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email id"
                required
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
              <img
                src={lock}
                alt=""
                className="h-5 w-5 object-contain opacity-60"
              />

              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <p onClick={() => navigate('/reset-password')} className="cursor-pointer text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700">
                Forgot password?
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="cursor-pointer w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30"
            >
              {state}
            </button>
          </form>

          {/* Switch Login / Signup */}
          {state === "Sign Up" ? (
            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?
              <span
                onClick={() => setState("Login")}
                className="ml-1 cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?
              <span
                onClick={() => setState("Sign Up")}
                className="ml-1 cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Sign up
              </span>
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;