import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuList from "../Sidebar/MenuList";
import Logo from "../Sidebar/Logo";
import {
  Layout,
  Button,
  Card,
  Row,
  Col,
  Avatar,
  Badge,
  Popconfirm,
  message,
  Spin,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BellOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import CreateTasks from "../Tasks/CreateTasks";
import EditTask from "./EditTasks";
import { motion } from "framer-motion";

const { Sider, Content } = Layout;

const TASK_TYPE = {
  pending: "bg-red-600",
  inprogress: "bg-yellow-500",
  completed: "bg-green-600",
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const TaskDetails = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false); // 🌟 NEW STATE

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/task/getAllTasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const toggleModal = () => setOpen(!open);

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/task/deleteTask/${id}`
      );
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== id));
        message.success("Task deleted successfully");
      } else {
        message.error("Failed to delete the task");
      }
    } catch (error) {
      message.error("Failed to delete the task");
    }
  };

  const handleEditTask = () => {
    fetchTasks();
    setIsEditModalOpen(false);
  };

  const handleEditButtonClick = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  // 🌟 View with full page loader
  const handleViewTask = (taskId) => {
    setIsPageLoading(true);
    setTimeout(() => {
      window.location.href = `/getTask/${taskId}`;
    }, 3500); // Simulated delay
  };

  return (
    <>
      {/* 🌟 Full Page Loader Overlay */}
      {isPageLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80">
          <Spin size="large" tip="Loading task..." />
        </div>
      )}

      <Layout>
        <Sider className="sidebar">
          <Logo />
          <MenuList />
        </Sider>
        <Layout>
          <Content className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8 mt-16">
              <h1 className="text-3xl font-extrabold">Tasks</h1>
              <div className="flex items-center space-x-4">
                <Badge count={5}>
                  <Avatar size={40} className="bg-white shadow">
                    <BellOutlined className="text-xl text-purple-600" />
                  </Avatar>
                </Badge>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={toggleModal}
                  className="shadow-md"
                >
                  Create Task
                </Button>
              </div>
            </div>

            {open && (
              <CreateTasks open={open} setOpen={setOpen} getTask={fetchTasks} />
            )}

            <Row gutter={[24, 24]}>
              {["Pending", "Inprogress", "Completed"].map((status, idx) => {
                const filteredTasks = tasks.filter(
                  (task) => task.status.toLowerCase() === status.toLowerCase()
                );

                return (
                  <Col xs={24} sm={24} md={12} lg={8} key={status}>
                    <Card
                      title={
                        <span className="flex items-center gap-2 font-semibold text-lg">
                          <span
                            className={`w-3 h-3 rounded-full inline-block ${TASK_TYPE[status.toLowerCase()]}`}
                          />
                          {status}
                        </span>
                      }
                      bordered={false}
                      style={{
                        backgroundColor:
                          status === "Pending"
                            ? "#FEE2E2"
                            : status === "Inprogress"
                            ? "#FEF3C7"
                            : "#DCFCE7",
                        minHeight: "400px",
                      }}
                      className="shadow-md"
                    >
                      {filteredTasks.length === 0 && (
                        <p className="text-gray-500 mt-6">
                          No tasks in this category.
                        </p>
                      )}
                      {filteredTasks.map((task, i) => (
                        <motion.div
                          key={task._id}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                          }}
                          className="mb-4 rounded-lg bg-white p-4 cursor-pointer transition-shadow"
                          style={{
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 text-lg font-semibold mb-1">
                                <span
                                  className={`w-3 h-3 rounded-full inline-block ${TASK_TYPE[status.toLowerCase()]}`}
                                />
                                {task.title}
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                Due Date:{" "}
                                {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                              <p className="text-gray-700">{task.description}</p>
                              <div className="text-xs text-gray-500 mt-3">
                                Created:{" "}
                                {new Date(task.createdAt).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="flex flex-col items-center space-y-2">
                              <Button
                                type="text"
                                onClick={() => handleViewTask(task._id)}
                                className="transition-colors duration-200 hover:text-blue-600"
                              >
                                <EyeOutlined
                                  style={{
                                    color: "#6b7280",
                                    fontSize: "18px",
                                  }}
                                />
                              </Button>

                              <Button
                                type="text"
                                icon={
                                  <EditOutlined
                                    style={{
                                      color: "#6b7280",
                                      fontSize: "18px",
                                    }}
                                  />
                                }
                                onClick={() => handleEditButtonClick(task)}
                                className="transition-colors duration-200 hover:text-green-600"
                              />

<Popconfirm
  title={<span className="text-base">Delete this task?</span>}
  description={<span className="text-sm">Are you sure you want to proceed?</span>}
  onConfirm={() => handleDeleteTask(task._id)}
  okText="Yes"
  cancelText="No"
  overlayStyle={{ width: "220px" }}
>
  <Button
    type="text"
    icon={
      <DeleteOutlined
        style={{
          color: "#6b7280",
          fontSize: "18px",
        }}
      />
    }
    className="transition-colors duration-200 hover:text-red-600"
  />
</Popconfirm>

                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Content>
        </Layout>

        {editTask && (
          <EditTask
            open={isEditModalOpen}
            setOpen={setIsEditModalOpen}
            task={editTask}
            handleEditTask={handleEditTask}
          />
        )}
      </Layout>
    </>
  );
};

export default TaskDetails;
