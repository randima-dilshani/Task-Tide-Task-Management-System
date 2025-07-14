import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LogoImg from "../assets/images/task2.png"; // Adjust path if needed

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-950 text-white relative overflow-hidden">

      {/* 🌟 Glass Effect Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/10 shadow-lg">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 h-[100px]">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <img src={LogoImg} alt="Task Tide Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl">Task Tide</span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-10 text-base md:text-lg tracking-wider text-white font-semibold">
            <Link to="/login" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-400 transition">About</Link>
            <Link to="/login" className="hover:text-blue-400 transition">Features</Link>
            <Link to="/login" className="hover:text-blue-400 transition">How it Works</Link>
          </nav>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <Link to="/login">
              <button className="w-20 sm:w-24 border border-blue-500 text-blue-400 py-1.5 sm:py-2 font-medium hover:bg-blue-500 hover:text-white transition duration-300">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="w-20 sm:w-24 bg-blue-600 text-white py-1.5 sm:py-2 font-medium hover:bg-blue-500 transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Background Blobs */}
      <div className="absolute -top-16 -left-16 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 sm:w-[400px] sm:h-[400px] bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full filter blur-3xl opacity-20 z-0" />

      {/* Left Section */}
      <div className="w-full lg:w-1/2 px-4 sm:px-6 md:px-12 flex items-center justify-center pt-[160px] pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 sm:space-y-8 text-center px-2 sm:px-0 max-w-md sm:max-w-lg"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl tracking-widest text-blue-400 font-bold uppercase">
            Welcome to <span className="text-white">Task Tide</span>
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-snug tracking-tight">
            Organize. Prioritize. <br />
            <span className="text-blue-400">Get Things Done.</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-md mx-auto">
            Task Tide helps you ride the wave of productivity by managing your
            workflow, tracking deadlines, and collaborating smoothly with your
            team – all in one place.
          </p>

          <div className="flex justify-center">
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold transition duration-300 shadow-md rounded-md">
                Get It Free
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side (Illustration) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 pt-[140px] pb-20 relative z-10">
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-purple-500 opacity-10 blur-3xl rounded-full z-0"></div>

        <motion.img
          src="image1.jpg"
          alt="Task Tide Illustration"
          className="w-[85%] sm:w-[90%] lg:w-[600px] xl:w-[600px] opacity-90 shadow-2xl relative z-10 rounded-md"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>

      {/* Floating Ball */}
      <motion.div
        className="absolute w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full opacity-30 blur-2xl z-10"
        initial={{ x: "-10%", y: "100%" }}
        animate={{ x: "110%", y: "-20%" }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default LandingPage;
