import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import SignUpImage from "../../assets/images/task5.jpg";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setConfirmPassword("");
    setPassword("");
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const user = { username, email, password };

    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/register", user);
      if (response && response.data) {
        toast.success("Registration Successful!");
        resetForm();
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative h-screen bg-blue-950 flex items-center justify-center px-5 lg:px-0 overflow-hidden">
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-700 rounded-full filter blur-3xl opacity-30 animate-blob1 z-0"></div>
      <div className="absolute bottom-[-120px] left-[50%] translate-x-[-50%] w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-3xl opacity-25 animate-blob3 z-0"></div>

      <motion.div
        className="w-full max-w-4xl bg-white border shadow-lg rounded-2xl flex justify-center flex-1 min-h-[520px] relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex-1 bg-blue-100 hidden md:flex items-center justify-center rounded-l-2xl" variants={imageVariants}>
          <div className="p-6">
            <img
              src={SignUpImage}
              alt="signup"
              width="400px"
              draggable={false}
              className="object-contain rounded-2xl"
            />
          </div>
        </motion.div>

        <motion.div className="w-full md:w-1/2 p-6 sm:p-12 flex flex-col justify-center" variants={formVariants}>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-blue-900">Sign Up</h1>
            <p className="text-sm text-gray-500 mt-3">Hey! Enter your details to create your account</p>
          </div>

          <form onSubmit={sendData} className="mt-8 flex flex-col gap-4 w-full max-w-sm mx-auto">
            <input
              className="w-full px-5 py-3 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="w-full px-5 py-3 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className="px-5 py-3 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="px-5 py-3 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="mt-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
            <p className="mt-4 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-900 font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>

      {/* Animations */}
      <style>
        {`
          @keyframes blob1 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(30px, 20px) scale(1.1); }
          }
          @keyframes blob3 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(40px, -20px) scale(1.15); }
          }
          .animate-blob1 { animation: blob1 7s infinite ease-in-out; }
          .animate-blob3 { animation: blob3 6s infinite ease-in-out; }
        `}
      </style>
    </div>
  );
};

export default SignUp;
