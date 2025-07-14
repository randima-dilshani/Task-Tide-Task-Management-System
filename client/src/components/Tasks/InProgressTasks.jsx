import React, { useState, useEffect } from "react";
import { Layout, Card, Row, Col, Button, Table, Pagination, Tag,} from "antd";
import { AppstoreOutlined, UnorderedListOutlined, SyncOutlined,} from "@ant-design/icons";
import Logo from "../Sidebar/Logo";
import MenuList from "../Sidebar/MenuList";
import axios from "axios";
import { motion } from "framer-motion";

const { Sider, Content } = Layout;

const TASK_TYPE = {
  todo: "bg-blue-600",
  inprogress: "bg-yellow-600",
  completed: "bg-green-600",
};

const InProgressTasks = () => {
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
        const inprogressTasks = response.data.filter(
          (task) => task.status === "Inprogress"
        );
        setTasks(inprogressTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => (
        <Tag icon={<SyncOutlined spin />} color="blue">
          In Progress
        </Tag>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

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
        <Content className="p-6 bg-gray-100 min-h-screen">
          <div className="flex justify-between items-center mt-16 mb-6">
           <div className="px-6 py-3 rounded-xl shadow text-center" style={{ backgroundColor: "#fffbe6" }}>
  <h1 className="text-2xl md:text-3xl font-bold text-yellow-800 tracking-wide flex items-center justify-center gap-2">
    🔄 <span>All In Progress Tasks</span>
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
            <>
              <Row gutter={[16, 16]}>
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
                              className={`w-3 h-3 rounded-full inline-block ${TASK_TYPE.inprogress}`}
                            />
                            <span className="font-semibold">{task.title}</span>
                          </div>
                        }
                        className="shadow-md rounded-lg"
                        style={{ backgroundColor: "#fffbe6" }}
                      >
                        <p className="mb-2">
                          <strong>Description:</strong> {task.description}
                        </p>
                        <p className="mb-1">
                          <strong>Status:</strong>{" "}
                          <Tag icon={<SyncOutlined spin />} color="blue">
                            In Progress
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
              <div className="text-center mt-6">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={tasks.length}
                  onChange={handleChangePage}
                />
              </div>
            </>
          ) : (
            <>
              <Table
                dataSource={paginatedTasks}
                columns={columns}
                rowKey="_id"
                pagination={false}
                bordered
                className="mt-4"
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
        </Content>
      </Layout>
    </Layout>
  );
};

export default InProgressTasks;
