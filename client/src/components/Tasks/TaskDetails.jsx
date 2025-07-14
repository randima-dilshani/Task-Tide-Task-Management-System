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
  Input,
  Radio,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BellOutlined,
  EyeOutlined,
  SearchOutlined,
  FundOutlined,
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
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyTasks, setShowMyTasks] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [showMyTasks]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const url = showMyTasks
        ? "http://localhost:8080/api/v1/task/getMyTasks"
        : "http://localhost:8080/api/v1/task/getAllTasks";

      const response = await axios.get(url, config);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      message.error("Failed to fetch tasks");
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

  const handleViewTask = (taskId) => {
    setIsPageLoading(true);
    setTimeout(() => {
      window.location.href = `/getTask/${taskId}`;
    }, 3500);
  };

  const filteredTasks = tasks.filter((task) => {
    const titleMatch = task.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const assignedMatch = task.user?.username
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || assignedMatch;
  });

  return (
    <>
      {isPageLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80">
          <Spin size="large" tip="Loading task..." />
        </div>
      )}

      <Layout>
        {/* Responsive Sider */}
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          className="sidebar"
          style={{ minHeight: "100vh" }}
        >
          <Logo />
          <MenuList />
        </Sider>

        <Layout>
          <Content className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 mt-4 md:mt-6">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-0">
                <FundOutlined style={{ fontSize: "28px", color: "#333" }} />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide">
                  Progress Board
                </h1>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <Badge count={5}>
                  <Avatar size={36} className="bg-white shadow">
                    <BellOutlined className="text-xl text-purple-600" />
                  </Avatar>
                </Badge>
                <Button
                  icon={<PlusOutlined />}
                  size="middle"
                  onClick={toggleModal}
                  style={{
                    backgroundColor: "#1E3A8A",
                    color: "#fff",
                    border: "none",
                  }}
                  className="hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
                >
                  Create Task
                </Button>
              </div>
            </div>

            {/* My/All Tasks Toggle */}
            <div className="mb-5 max-w-xs sm:max-w-md">
              <Radio.Group
                value={showMyTasks ? "my" : "all"}
                onChange={(e) => setShowMyTasks(e.target.value === "my")}
                optionType="button"
                buttonStyle="solid"
                className="w-full"
              >
                <Radio.Button
                  value="my"
                  className={`w-1/2 text-center text-sm sm:text-base ${
                    showMyTasks ? "bg-blue-900 text-white" : "bg-gray-100 text-black"
                  }`}
                  style={{ borderColor: "#1E3A8A" }}
                >
                  My Tasks
                </Radio.Button>
                <Radio.Button
                  value="all"
                  className={`w-1/2 text-center text-sm sm:text-base ${
                    !showMyTasks ? "bg-blue-900 text-white" : "bg-gray-100 text-black"
                  }`}
                  style={{ borderColor: "#1E3A8A" }}
                >
                  All Tasks
                </Radio.Button>
              </Radio.Group>
            </div>

            {/* Search */}
            <div className="mb-6 max-w-xs sm:max-w-md">
              <Input
                placeholder="Search by task title or assigned user"
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
                size="middle"
                className="rounded-md"
              />
            </div>

            {open && (
              <CreateTasks open={open} setOpen={setOpen} getTask={fetchTasks} />
            )}

            <Row gutter={[16, 16]}>
              {["Pending", "Inprogress", "Completed"].map((status) => {
                const statusFilteredTasks = filteredTasks.filter(
                  (task) => task.status.toLowerCase() === status.toLowerCase()
                );

                return (
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    key={status}
                    className="mb-4"
                  >
                    <Card
                      title={
                        <span className="flex items-center gap-2 font-semibold text-lg">
                          <span
                            className={`w-3 h-3 rounded-full inline-block ${
                              TASK_TYPE[status.toLowerCase()]
                            }`}
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
                      {statusFilteredTasks.length === 0 && (
                        <p className="text-gray-500 mt-6">No tasks in this category.</p>
                      )}
                      {statusFilteredTasks.map((task, i) => (
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
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 text-lg font-semibold mb-1">
                                <span
                                  className={`w-3 h-3 rounded-full inline-block ${
                                    TASK_TYPE[status.toLowerCase()]
                                  }`}
                                />
                                <span className="truncate">{task.title}</span>
                              </div>

                              <div className="text-sm text-gray-600 mb-1 truncate">
                                Assigned To:{" "}
                                <span className="text-black font-medium truncate">
                                  {task.user?.username || "Unassigned"}
                                </span>
                              </div>

                              <div className="text-sm text-gray-600 mb-1">
                                Due Date:{" "}
                                {new Date(task.dueDate).toLocaleDateString()}
                              </div>

                              <p className="text-gray-700 line-clamp-3">
                                {task.description}
                              </p>

                              <div className="text-xs text-gray-500 mt-3">
                                Created:{" "}
                                {new Date(task.createdAt).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="flex flex-row sm:flex-col items-center space-x-4 sm:space-x-0 sm:space-y-2 mt-4 sm:mt-0">
                              <Button
                                type="text"
                                onClick={() => handleViewTask(task._id)}
                                className="transition-colors duration-200 hover:text-blue-600"
                                aria-label="View Task"
                              >
                                <EyeOutlined
                                  style={{ fontSize: "18px", color: "#6b7280" }}
                                />
                              </Button>

                              <Button
                                type="text"
                                icon={
                                  <EditOutlined
                                    style={{ fontSize: "18px", color: "#6b7280" }}
                                  />
                                }
                                onClick={() => handleEditButtonClick(task)}
                                className="transition-colors duration-200 hover:text-green-600"
                                aria-label="Edit Task"
                              />

                              <Popconfirm
                                title={<span className="text-base">Delete this task?</span>}
                                description={
                                  <span className="text-sm">
                                    Are you sure you want to proceed?
                                  </span>
                                }
                                onConfirm={() => handleDeleteTask(task._id)}
                                okText="Yes"
                                cancelText="No"
                                overlayStyle={{ width: "220px" }}
                              >
                                <Button
                                  type="text"
                                  icon={
                                    <DeleteOutlined
                                      style={{ fontSize: "18px", color: "#6b7280" }}
                                    />
                                  }
                                  className="transition-colors duration-200 hover:text-red-600"
                                  aria-label="Delete Task"
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

          {editTask && (
            <EditTask
              open={isEditModalOpen}
              setOpen={setIsEditModalOpen}
              task={editTask}
              handleEditTask={handleEditTask}
            />
          )}
        </Layout>
      </Layout>
    </>
  );
};

export default TaskDetails;
