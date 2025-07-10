import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Col, Table, message, Calendar } from "antd";

const { Content } = Layout;

const DashBoardTasks = () => {
  const [tasks, setTasks] = useState([]);

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
      message.error("Failed to fetch tasks from the database");
    }
  };

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
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => new Date(dueDate).toLocaleDateString(),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <div className="dashboard-header">
          <h1 className="dashboard-title">Tasks</h1>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={15}>
              <Card title="All Tasks" bordered={false}>
                <Table
                  dataSource={tasks}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={9}>
              <Card
                title="Calendar"
                bordered={false}
                style={{ height: "430px" }}
              >
                <Calendar fullscreen={false} />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default DashBoardTasks;
