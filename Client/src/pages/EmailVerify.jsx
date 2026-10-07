import React, { useContext, useEffect, useRef } from "react";
import logo from "../assets/authentication.png";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EmailVerify() {
  const navigate = useNavigate();

  const { backendUrl, getUserData, userData, isLoggedin } = useContext(AppContext);

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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData])

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-100 via-slate-50 to-indigo-100 px-6 sm:px-10 lg:px-16">

      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2.5 pt-5 cursor-pointer w-fit"
      >
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

      {/* Verification Form */}
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center py-10">

        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-2xl shadow-slate-300/40"
        >

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Email Verification
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter the 6-digit verification code sent to your
              email address.
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
                  className="h-12 w-11 sm:h-14 sm:w-12 rounded-xl border border-slate-200 bg-slate-50 text-center text-lg sm:text-xl font-semibold text-slate-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="cursor-pointer mt-8 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30"
          >
            Verify Email
          </button>

          {/* Extra text */}
          <p className="mt-5 text-center text-xs text-slate-400">
            Please check your inbox and spam folder for the OTP.
          </p>

        </form>
      </div>
    </div>
  );
}

export default EmailVerify;