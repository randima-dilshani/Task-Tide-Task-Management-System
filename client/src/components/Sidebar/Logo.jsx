import React from "react";
import LogoImg from "../../assets/images/task2.png"; // Adjust the path as necessary

const Logo = () => {
  return (
    <div className="logo flex justify-center items-center">
      <h1 className="flex gap-3 items-center mt-2 mb-5">
        <img
          src={LogoImg}
          alt="Task Tide Logo"
          className="w-10 h-10 object-contain"
        />
        <span className="text-2xl font-bold text-white">Task Tide</span>
      </h1>
    </div>
  );
};

export default Logo;
