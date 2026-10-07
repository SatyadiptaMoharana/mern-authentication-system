import React, { useContext, useRef, useState } from "react";
import logo from "../assets/authentication.png";
import mail from "../assets/mail.png";
import lock from "../assets/lock.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();
  const {backendUrl} = useContext(AppContext)
  axios.defaults.withCredentials = true

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (
      e.target.value.length > 0 &&
      index < inputRefs.current.length - 1
    ) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");

    pasteArray.map((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault()
    try {
      
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)

    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault()
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    try {
      
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-100 via-slate-50 to-indigo-100 px-6 sm:px-10 lg:px-16">

      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex w-fit cursor-pointer items-center gap-2.5 pt-5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20">
          <img
            src={logo}
            alt="AuthNova"
            className="h-5 w-5 object-contain"
          />
        </div>

        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Auth<span className="text-indigo-600">Nova</span>
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-10">

        {/* ================================================= */}
        {/* STEP 1 — ENTER EMAIL */}
        {/* ================================================= */}

        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-300/40 sm:p-9">

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Reset Password
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your registered email address.
              </p>
            </div>

            {/* Email Input */}
            <div className="mt-7 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
              <img
                src={mail}
                alt=""
                className="h-5 w-5 object-contain opacity-60"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
                required
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-7 w-full cursor-pointer rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* ================================================= */}
        {/* STEP 2 — ENTER OTP */}
        {/* ================================================= */}

        {!isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitOtp} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-300/40 sm:p-9">

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Reset Password OTP
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter the 6-digit code sent to your email address.
              </p>
            </div>

            {/* OTP Inputs */}
            <div
              className="mt-8 flex justify-center gap-2.5 sm:gap-3"
              onPaste={handlePaste}
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    required
                    maxLength={1}
                    key={index}
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="h-12 w-11 rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-semibold text-slate-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 sm:h-14 sm:w-12 sm:text-xl"
                  />
                ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-8 w-full cursor-pointer rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30"
            >
              Verify OTP
            </button>

            {/* Helper Text */}
            <p className="mt-5 text-center text-xs text-slate-400">
              Please check your inbox and spam folder for the OTP.
            </p>
          </form>
        )}

        {/* ================================================= */}
        {/* STEP 3 — NEW PASSWORD */}
        {/* ================================================= */}

        {isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitNewPassword} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-300/40 sm:p-9">

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                New Password
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter the new password below.
              </p>
            </div>

            {/* Password Input */}
            <div className="mt-7 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-200 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
              <img
                src={lock}
                alt=""
                className="h-5 w-5 object-contain opacity-60"
              />

              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="New password"
                required
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-7 w-full cursor-pointer rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;