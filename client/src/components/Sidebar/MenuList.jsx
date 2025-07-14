import { Menu } from "antd";
import { useState, useEffect } from "react";
import {
  HomeOutlined,
  RollbackOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTasks, FaUser, FaUsers } from "react-icons/fa";
import { MdTaskAlt, MdOutlinePendingActions } from "react-icons/md";

const MenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);

  // Add state to track window width for responsiveness
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  useEffect(() => {
    // Handler to update windowWidth state on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuSelect = async (e) => {
    if (e.key === "/profile") {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:8080/api/v1/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user profile");

        const userData = await response.json();

        localStorage.setItem("userProfile", JSON.stringify(userData));
        setSelectedKeys([e.key]);
        navigate(e.key);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    } else {
      setSelectedKeys([e.key]);
      navigate(e.key);
    }
  };

  const menuItems = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/taskdetails",
      icon: <FaTasks />,
      label: "Tasks",
    },
    {
      key: "/completedtasks",
      icon: <MdTaskAlt />,
      label: "Completed",
    },
    {
      key: "/inprogresstasks",
      icon: <AreaChartOutlined />,
      label: "In Progress",
    },
    {
      key: "/pendingtasks",
      icon: <MdOutlinePendingActions />,
      label: "To Do",
    },
    {
      key: "/team",
      icon: <FaUsers />,
      label: "Team",
    },
    {
      key: "/profile",
      icon: <FaUser />,
      label: "Profile",
    },
    {
      key: "/",
      icon: <RollbackOutlined />,
      label: "Logout",
    },
  ];

  // Change menu mode based on screen width (inline for desktop, vertical for mobile)
  const isMobile = windowWidth < 768; 
  return (
    <Menu
      theme="dark"
      className="menu-bar"
      selectedKeys={selectedKeys}
      onClick={handleMenuSelect}
      items={menuItems}
      mode={isMobile ? "vertical" : "inline"}
      inlineCollapsed={isMobile} // Collapse inline menu on mobile for cleaner look
      style={{ height: "100%", borderRight: 0 }}
    />
  );
};

export default MenuList;
