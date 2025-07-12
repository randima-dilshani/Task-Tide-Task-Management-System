import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LogoImg from "../assets/images/task2.png"; // Adjust the path as necessary

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-950 text-white relative overflow-hidden">

      {/* Top-right Login & Sign Up Buttons */}
      <div className="absolute top-6 right-6 flex gap-4 z-20">
        <Link to="/login">
          <button className="w-32 bg-transparent border border-blue-500 text-blue-400 py-2 font-medium hover:bg-blue-500 hover:text-white transition duration-300">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="w-32 bg-blue-600 text-white py-2 font-medium hover:bg-blue-500 transition duration-300">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Background Gradient & Blob Effect */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full filter blur-3xl opacity-20 z-0" />

      {/* Left Side (Text Content) */}
      <div className="w-full lg:w-1/2 px-6 md:px-12 flex items-center justify-center py-20 relative z-10">
        
        {/* Animated Logo & Name top-left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="absolute top-6 left-6 flex items-center space-x-3 cursor-pointer select-none z-20"
        >
          <img
            src={LogoImg}
            alt="Task Tide Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-white font-bold text-xl md:text-2xl">
            Task Tide
          </span>
        </motion.div>

        {/* Main Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl tracking-widest text-blue-400 font-bold uppercase">
            Welcome to <span className="text-white">Task Tide</span>
          </h2>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Organize. Prioritize. <br />
            <span className="text-blue-400">Get Things Done.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Task Tide helps you ride the wave of productivity by managing your
            workflow, tracking deadlines, and collaborating smoothly with your
            team – all in one place.
          </p>

          {/* Get It Free Button */}
          <div className="flex justify-center">
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-lg font-semibold transition duration-300 shadow-md">
                Get It Free
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side (Illustration) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 relative z-10">
        {/* Optional Glow Behind Image */}
        <div className="absolute w-80 h-80 bg-purple-500 opacity-10 blur-3xl rounded-full z-0"></div>

        <motion.img
          src="image1.jpg"
          alt="Task Tide Illustration"
          className="w-[90%] lg:w-[600px] xl:w-[600px] opacity-90 shadow-2xl relative z-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
    </div>
  );
};

export default LandingPage;
