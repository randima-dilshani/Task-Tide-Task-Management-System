import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoginImage from "../../assets/images/task3.avif";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const loginData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        loginData
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successful");
        window.location.href = "/dashboard";
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Password or Email is incorrect.");
    }

    resetForm();
  };

  return (
    <div className="relative h-screen bg-blue-950 flex items-center justify-center px-5 lg:px-0 overflow-hidden">

      {/* Brighter Background Animated Blobs */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-700 rounded-full filter blur-3xl opacity-40 animate-blob1 z-0"></div>
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-800 rounded-full filter blur-3xl opacity-40 animate-blob2 z-0"></div>
      <div className="absolute bottom-[-120px] left-[50%] translate-x-[-50%] w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-3xl opacity-35 animate-blob3 z-0"></div>

      <motion.div
        className="w-full max-w-4xl bg-white border shadow-lg rounded-2xl flex justify-center flex-1 min-h-[480px] relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex-1 bg-blue-100 hidden md:flex items-center justify-center rounded-l-2xl"
          variants={imageVariants}
        >
          <div className="p-6">
            <img
              src={LoginImage}
              alt="login"
              width={"400px"}
              draggable={false}
              className="object-contain rounded-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 p-6 sm:p-12 flex flex-col justify-center"
          variants={formVariants}
        >
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-blue-900">Sign In</h1>
            <p className="text-sm text-gray-500 mt-3">
              Hey there! Sign in and start managing your system
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="mt-10 flex flex-col gap-4 w-full max-w-sm mx-auto"
          >
            <input
              className="w-full px-5 py-3 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full px-5 py-3 rounded-md bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="text-red-500 text-xs">{error}</div>}

            <motion.button
              type="submit"
              className="mt-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>

            <p className="mt-4 text-xs text-gray-600 text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-900 font-semibold">
                Sign Up
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>

      {/* Blob Animation Keyframes */}
      <style>
        {`
          @keyframes blob1 {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            50% {
              transform: translate(30px, 20px) scale(1.1);
            }
          }
          @keyframes blob2 {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            50% {
              transform: translate(-20px, 30px) scale(1.1);
            }
          }
          @keyframes blob3 {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
            }
            50% {
              transform: translate(40px, -20px) scale(1.15);
            }
          }
          .animate-blob1 {
            animation: blob1 7s infinite ease-in-out;
          }
          .animate-blob2 {
            animation: blob2 8s infinite ease-in-out;
          }
          .animate-blob3 {
            animation: blob3 6s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
