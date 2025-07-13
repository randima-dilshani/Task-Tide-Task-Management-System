import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AboutImage from "../assets/images/task7.avif";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gray-950 text-white px-6 py-16 lg:py-24 flex flex-col items-center justify-center overflow-hidden">

      {/* 🎨 Background Blobs */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-20 z-0" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full filter blur-3xl opacity-20 z-0" />

      {/* 🧭 Top Heading */}
      <div className="relative z-10 text-center mb-12 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-400">About Us</h2>
        <p className="text-gray-300 text-lg mt-2 font-medium">
          We’re proudly serving <span className="text-blue-500 font-semibold">12,300+ businesses</span> with their project management and collaboration needs.
        </p>
      </div>

      {/* 📦 Content Section */}
      <motion.div
        className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* 📷 Left: Image */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={AboutImage}
            alt="About Illustration"
            className="w-full h-auto max-w-md rounded-xl shadow-xl"
          />
        </motion.div>

        {/* 📄 Right: Text */}
        <motion.div
          className="w-full lg:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-gray-400 space-y-4 text-base leading-relaxed">
            <p>
              Whether it’s Scrum, Kanban, or your unique approach—Task Tide adapts to you, offering total flexibility and control over your work.
            </p>
            <p>
              Visualize your workflow clearly, track every detail, and stay on top of progress in real-time.
            </p>
            <p>
              Eliminate bottlenecks, balance team workloads, and ensure smooth coordination—no matter your team’s size.
            </p>
            <p>
              From onboarding your 10th to your 1000th member, Task Tide ensures everyone stays synced, productive, and happy.
            </p>
          </div>

          <Link to="/login">
            <button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium transition">
              Get it Free
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* 🌐 Floating Blob Animation */}
      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full opacity-30 blur-2xl z-10"
        initial={{ x: "-10%", y: "100%" }}
        animate={{ x: "110%", y: "-20%" }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default About;
