import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function Home() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-indigo-50 via-white to-purple-50">
      
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <Navbar />
        <Header />
      </div>

    </div>
  );
}

export default Home;