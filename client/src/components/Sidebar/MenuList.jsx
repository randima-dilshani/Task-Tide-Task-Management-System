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
import api from "../../util/axios";  

const MenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState([location.pathname]);

  // Track window width for responsiveness
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuSelect = async (e) => {
    if (e.key === "/profile") {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        // Use axios instance here
        const response = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.setItem("userProfile", JSON.stringify(response.data));
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

  const isMobile = windowWidth < 768;
  return (
    <Menu
      theme="dark"
      className="menu-bar"
      selectedKeys={selectedKeys}
      onClick={handleMenuSelect}
      items={menuItems}
      mode={isMobile ? "vertical" : "inline"}
      inlineCollapsed={isMobile}
      style={{ height: "100%", borderRight: 0 }}
    />
  );
};

export default MenuList;
