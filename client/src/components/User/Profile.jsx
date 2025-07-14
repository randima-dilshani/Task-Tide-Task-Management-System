import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed.user);
    }
  }, []);

  const goBack = () => {
    navigate("/dashboard");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 🎨 Animated Background Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-blob1 z-0"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-blob2 z-0"></div>

      <motion.div
        className="bg-blue-50 text-gray-900 rounded-2xl shadow-xl p-10 max-w-md w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center mb-6">
          <Avatar size={80} icon={<UserOutlined />} className="bg-blue-500 mb-3" />
          <h1 className="text-3xl font-bold text-blue-900">My Profile</h1>
        </div>

        {user ? (
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-600">Username:</label>
              <p className="text-gray-800">{user.username || "N/A"}</p>
            </div>

            <div>
              <label className="block font-semibold text-gray-600">Email:</label>
              <p className="text-gray-800">{user.email || "N/A"}</p>
            </div>

            <div>
              <label className="block font-semibold text-gray-600">Joined:</label>
              <p className="text-gray-800">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Back Button in Center */}
            <div className="flex justify-center mt-6">
              <button
                onClick={goBack}
                className="px-4 py-1 bg-blue-800 hover:bg-blue-700 text-white text-sm font-medium rounded-md flex items-center gap-2 transition"
              >
                <ArrowLeftOutlined style={{ fontSize: "14px" }} />
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">No profile data</h2>
            <p>Please login to view your profile.</p>
          </div>
        )}
      </motion.div>

      {/* Blob Animations */}
      <style>
        {`
          @keyframes blob1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, 20px) scale(1.05); }
          }
          @keyframes blob2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -10px) scale(1.1); }
          }
          .animate-blob1 { animation: blob1 8s infinite ease-in-out; }
          .animate-blob2 { animation: blob2 9s infinite ease-in-out; }
        `}
      </style>
    </motion.div>
  );
};

export default Profile;
