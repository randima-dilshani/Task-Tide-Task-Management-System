import React, { useState, useEffect } from "react";
import { Layout, Card, Row, Col, Button, Table, Pagination } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Logo from "../Sidebar/Logo";
import MenuList from "../Sidebar/MenuList";
import axios from "axios";

const { Sider, Content } = Layout;

// Define TASK_TYPE object
const TASK_TYPE = {
  todo: "bg-blue-600",
  inprogress: "bg-yellow-600",
  completed: "bg-green-600",
};

const InProgressTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("card");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of cards to show per page

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
      key: "",
      render: (text, record) => (
        <span
          className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.inprogress}`}
          style={{ display: "flex" }}
        ></span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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

  const paginationOptions = {
    pageSize: pageSize,
    total: tasks.length,
    onChange: handleChangePage,
  };

  useEffect(() => {
    // Fetch tasks from the database
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/task/getAllTasks"
        );
        const allTasks = response.data;
        const inprogressTasks = allTasks.filter(
          (task) => task.status === "Inprogress"
        );
        setTasks(inprogressTasks);
      } catch (error) {
        console.error("Failed to fetch tasks from the database:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "60px",
            }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
              In Progress Tasks
            </h1>
            <div>
              <Button
                icon={<AppstoreOutlined />}
                onClick={() => setView("card")}
                style={{ marginRight: "8px" }}
              >
                Card View
              </Button>
              <Button
                icon={<UnorderedListOutlined />}
                onClick={() => setView("list")}
              >
                List View
              </Button>
            </div>
          </div>
          {view === "card" ? (
            <>
              <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                {paginatedTasks.map((task) => (
                  <Col span={8} key={task.id}>
                    <Card
                      title={
                        <span>
                          <span
                            className={`rounded-full w-3 h-3 inline-block mr-2 ${TASK_TYPE.inprogress}`}
                          />
                          {task.title}
                        </span>
                      }
                      bordered={true}
                      style={{
                        borderColor: "black",
                        backgroundColor: "#CFECEC",
                      }}
                    >
                      <p>{task.description}</p>
                      <p>Status: {task.status}</p>
                      <p>
                        Created Date:{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </p>

                      <p>
                        Completed Date:{" "}
                        {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </Card>
                  </Col>
                ))}
              </Row>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Pagination {...paginationOptions} />
              </div>
            </>
          ) : (
            <>
              <Table
                style={{ marginTop: "20px" }}
                dataSource={paginatedTasks}
                columns={columns}
                rowKey="id"
                pagination={false}
              />
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Pagination {...paginationOptions} />
              </div>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default InProgressTasks;
