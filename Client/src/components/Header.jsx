import React, { useContext } from "react";
import robot from "../assets/robot.png";
import handwave from "../assets/handwave.png";
import { AppContext } from "../context/AppContext";

function Header() {

  const {userData} = useContext(AppContext)

  return (
    <section className="w-full flex flex-col items-center text-center px-5 pt-12 sm:pt-16 md:pt-20">

      {/* Robot Image */}
      <div className="mb-6">
        <img
          src={robot}
          alt="AuthNova assistant"
          className="w-44 sm:w-52 md:w-60 object-contain drop-shadow-xl"
        />
      </div>

      {/* Heading */}
      <h1 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        Hey {userData ? userData.name : 'Developer'}
        <img
          src={handwave}
          alt="Waving hand"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain"
        />
      </h1>

      {/* Subheading */}
      <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700">
        Welcome to{" "}
        <span className="text-indigo-600">AuthNova</span>
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-xl text-sm sm:text-base leading-7 text-gray-500">
        Secure your account and manage your authentication with ease.
        Sign in or create an account to get started.
      </p>

      {/* Get Started Button */}
      <button
        className="group mt-8 px-7 py-3 rounded-xl
        bg-indigo-600 text-white font-medium
        shadow-lg shadow-indigo-600/20
        transition-all duration-300
        hover:bg-indigo-700
        hover:shadow-xl hover:shadow-indigo-600/30
        hover:-translate-y-0.5
        active:translate-y-0 cursor-pointer"
      >
        Get Started
        <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>

    </section>
  );
}

export default Header;