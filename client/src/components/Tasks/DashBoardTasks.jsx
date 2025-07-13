import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Card, Row, Col, Table, message, Calendar, Tag, Tooltip,Progress } from "antd";
import { FaCheckCircle, FaClock, FaSpinner, FaExclamationCircle } from "react-icons/fa";

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

  const renderStatusIcon = (status) => {
    const tagStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      whiteSpace: "nowrap",
      minWidth: "120px",
      textAlign: "center",
    };

    switch (status) {
      case "Pending":
        return (
          <Tag color="orange" style={tagStyle}>
            <FaClock /> Pending
          </Tag>
        );
      case "Inprogress":
        return (
          <Tag color="blue" style={tagStyle}>
            <FaSpinner /> In Progress
          </Tag>
        );
      case "Completed":
        return (
          <Tag color="green" style={tagStyle}>
            <FaCheckCircle /> Completed
          </Tag>
        );
      default:
        return (
          <Tag color="default" style={tagStyle}>
            {status}
          </Tag>
        );
    }
  };

  const isExpired = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    return due < now;
  };

  const columns = [
    {
      title: <span style={{ whiteSpace: "nowrap" }}>Title</span>,
      dataIndex: "title",
      key: "title",
    },
    {
      title: <span style={{ whiteSpace: "nowrap" }}>Description</span>,
      dataIndex: "description",
      key: "description",
    },
    {
      title: <span style={{ whiteSpace: "nowrap" }}>Due Date</span>,
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) => {
        const formatted = new Date(dueDate).toLocaleDateString();
        return isExpired(dueDate) ? (
          <Tooltip title="Due date has passed">
            <span
              className="text-red-600 font-semibold flex items-center gap-1"
              style={{ whiteSpace: "nowrap" }}
            >
              {formatted} <FaExclamationCircle />
            </span>
          </Tooltip>
        ) : (
          <span style={{ whiteSpace: "nowrap" }}>{formatted}</span>
        );
      },
    },
    {
      title: <span style={{ whiteSpace: "nowrap" }}>Created At</span>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {new Date(createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: <span style={{ whiteSpace: "nowrap" }}>Status</span>,
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatusIcon(status),
    },
  ];

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const inprogressCount = tasks.filter((t) => t.status === "Inprogress").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;

  const completedPercent = totalTasks
    ? Math.round((completedCount / totalTasks) * 100)
    : 0;
  const inprogressPercent = totalTasks
    ? Math.round((inprogressCount / totalTasks) * 100)
    : 0;
  const pendingPercent = totalTasks
    ? Math.round((pendingCount / totalTasks) * 100)
    : 0;

  return (
    <Layout>
      <Content style={{ padding: "20px" }}>
        <div className="dashboard-header">
          <h1 className="dashboard-title font-bold text-xl mb-4">
            Manage and Track Your Tasks
          </h1>
        </div>
        <Row gutter={[16, 16]}>
          {/* Left side: Table */}
          <Col xs={24} sm={24} md={12} lg={15}>
            <Card
              title="Tasks Dashboard"
              bordered={false}
              className="shadow-lg rounded-xl"
            >
              <Table
                dataSource={tasks}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 6 }}
                rowClassName={(record, index) =>
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-blue-50"
                    : "hover:bg-blue-50"
                }
                bordered={false}
                className="modern-table"
              />
            </Card>
          </Col>

          {/* Right side: Two separate cards */}
          <Col xs={24} sm={24} md={12} lg={9}>
            {/* Overview */}
            <Card
              title="Task Overview"
              bordered={false}
              className="shadow-lg rounded-xl mb-4"
            >
              <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    percent={completedPercent}
                    strokeColor="#22c55e"
                    width={70}
                  />
                  <span className="mt-1 font-semibold text-xs text-green-600">
                    Completed
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    percent={inprogressPercent}
                    strokeColor="#3b82f6"
                    width={70}
                  />
                  <span className="mt-1 font-semibold text-xs text-blue-600">
                    In Progress
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    percent={pendingPercent}
                    strokeColor="#f97316"
                    width={70}
                  />
                  <span className="mt-1 font-semibold text-xs text-orange-600">
                    Pending
                  </span>
                </div>
              </div>
            </Card>

            {/* Calendar */}
            <Card
              title="Calendar"
              bordered={false}
              style={{ height: "360px", overflowY: "auto" }}
              className="shadow-lg rounded-xl"
            >
              <Calendar fullscreen={false} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DashBoardTasks;
