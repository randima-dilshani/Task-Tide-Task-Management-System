import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Table,
  Pagination,
  Tag,
} from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Logo from "../Sidebar/Logo";
import MenuList from "../Sidebar/MenuList";
import axios from "axios";
import { motion } from "framer-motion";

const { Sider, Content } = Layout;

const TASK_TYPE = {
  todo: "bg-red-600", // Changed to red for Pending
  inprogress: "bg-yellow-600",
  completed: "bg-green-600",
};

const ToDoTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("card");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/task/getAllTasks"
        );
        const pendingTasks = response.data.filter(
          (task) => task.status === "Pending"
        );
        setTasks(pendingTasks);
      } catch (error) {
        console.error("Failed to fetch tasks from the database:", error);
      }
    };

    fetchTasks();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      dataIndex: "",
      key: "statusIndicator",
      render: () => (
        <span
          className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.todo}`}
          style={{ display: "flex" }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => (
        <Tag
          icon={
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ display: "inline-block" }}
            >
              <ClockCircleOutlined />
            </motion.div>
          }
          color="red"
        >
          Pending
        </Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => new Date(dueDate).toLocaleDateString(),
    },
  ];

  // Animation variants for cards and rows
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

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          {/* Styled Heading */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "40px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff0f0",
                padding: "12px 24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                className="w-5 h-5 rounded-full inline-block"
                style={{ backgroundColor: "#dc2626" }}
              />
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#b91c1c",
                  margin: 0,
                }}
              >
                ToDo Tasks
              </h1>
            </div>

            <div>
              <Button
                icon={<AppstoreOutlined />}
                onClick={() => setView("card")}
                type={view === "card" ? "primary" : "default"}
                style={{ marginRight: "8px" }}
              >
                Card View
              </Button>
              <Button
                icon={<UnorderedListOutlined />}
                onClick={() => setView("list")}
                type={view === "list" ? "primary" : "default"}
              >
                List View
              </Button>
            </div>
          </div>

          {view === "card" ? (
            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
              {paginatedTasks.map((task, index) => (
                <Col xs={24} sm={12} md={8} key={task._id}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card
                      title={
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-full inline-block ${TASK_TYPE.todo}`}
                          />
                          <span className="font-semibold">{task.title}</span>
                        </div>
                      }
                      className="shadow-md rounded-lg"
                      style={{ backgroundColor: "#fff0f0" }}
                    >
                      <p className="mb-2">
                        <strong>Description:</strong> {task.description}
                      </p>
                      <p className="mb-1">
                        <strong>Status:</strong>{" "}
                        <Tag
                          icon={
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              style={{ display: "inline-block" }}
                            >
                              <ClockCircleOutlined />
                            </motion.div>
                          }
                          color="red"
                        >
                          Pending
                        </Tag>
                      </p>
                      <p className="mb-1">
                        <strong>Created:</strong>{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Due:</strong>{" "}
                        {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          ) : (
            <>
              <Table
                style={{ marginTop: "20px" }}
                dataSource={paginatedTasks}
                columns={columns}
                rowKey="_id"
                pagination={false}
                className="modern-table mt-4"
                bordered
              />
              <div className="text-center mt-6">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={tasks.length}
                  onChange={handleChangePage}
                />
              </div>
            </>
          )}
          <div className="text-center mt-6">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={tasks.length}
              onChange={handleChangePage}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ToDoTasks;
