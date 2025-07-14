import React, { useState, useEffect } from "react";
import api from "../util/axios";  
import { Layout, Row, Col } from "antd";
import { FaTasks, FaCheckCircle, FaSpinner, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "../components/Sidebar/Logo";
import MenuList from "../components/Sidebar/MenuList";
import DashBoardTasks from "../components/Tasks/DashBoardTasks";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/task/getAllTasks");  // <-- use api instance here
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const countTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  const totalTasks = tasks.length;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const cardData = [
    {
      title: "TOTAL TASKS",
      icon: <FaTasks />,
      count: totalTasks,
      bg: "bg-blue-800",
    },
    {
      title: "COMPLETED TASKS",
      icon: <FaCheckCircle />,
      count: countTasksByStatus("Completed"),
      bg: "bg-indigo-800",
    },
    {
      title: "TASK IN PROGRESS",
      icon: <FaSpinner />,
      count: countTasksByStatus("Inprogress"),
      bg: "bg-cyan-800",
    },
    {
      title: "TODOS",
      icon: <FaClipboardList />,
      count: countTasksByStatus("Pending"),
      bg: "bg-sky-800",
    },
  ];

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>

      <Layout>
        <Content className="p-6 bg-gray-100 min-h-screen">
          <Row gutter={[16, 16]}>
            {cardData.map((card, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <motion.div
                  className={`${card.bg} rounded-2xl shadow-lg text-white p-6 transition-transform hover:scale-105 hover:brightness-110`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-2">{card.icon}</div>
                    <h2 className="text-md font-semibold">{card.title}</h2>
                  </div>
                  <p className="text-3xl font-bold">{card.count}</p>
                </motion.div>
              </Col>
            ))}
          </Row>

          <div className="mt-8">
            <DashBoardTasks />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
