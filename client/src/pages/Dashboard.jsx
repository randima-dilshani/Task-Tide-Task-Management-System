import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Col, Flex, Progress } from "antd";
import {
  FaTasks,
  FaCheckCircle,
  FaSpinner,
  FaClipboardList,
} from "react-icons/fa";
import Logo from "../components/Sidebar/Logo";
import MenuList from "../components/Sidebar/MenuList";
import DashBoardTasks from "../components/Tasks/DashBoardTasks";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the database
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/task/getAllTasks"
        ); // Adjust the URL based on your API endpoint
        setTasks(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchTasks();
  }, []);

  // Function to calculate the count of tasks for each status
  const countTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  // Calculate the count of total tasks
  const totalTasks = tasks.length;

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content className="p-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={
                  <div className="flex items-center">
                    <FaTasks className="text-white mr-2" />
                    <span className="text-white">TOTAL TASKS</span>
                  </div>
                }
                bordered={false}
                className="bg-[#1d4ed8] text-white"
              >
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                  {totalTasks}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={
                  <div className="flex items-center">
                    <FaCheckCircle className="text-white mr-2" />
                    <span className="text-white">COMPLETED TASKS</span>
                  </div>
                }
                bordered={false}
                className="bg-green-500 text-white"
              >
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                  {countTasksByStatus("Completed")}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={
                  <div className="flex items-center">
                    <FaSpinner className="text-white mr-2" />
                    <span className="text-white">TASK IN PROGRESS</span>
                  </div>
                }
                bordered={false}
                className="bg-yellow-500 text-white"
              >
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                  {countTasksByStatus("Inprogress")}
                </p>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                title={
                  <div className="flex items-center">
                    <FaClipboardList className="text-white mr-2" />
                    <span className="text-white">TODOS</span>
                  </div>
                }
                bordered={false}
                className="bg-red-500 text-white"
              >
                <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                  {countTasksByStatus("Pending")}
                </p>
              </Card>
            </Col>
          </Row>
        </Content>
        <DashBoardTasks />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
