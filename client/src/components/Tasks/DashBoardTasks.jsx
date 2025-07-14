import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout,Card,Row,Col,Table,message,Calendar,Tag,Tooltip,Progress,} from "antd";
import { FaCheckCircle, FaClock, FaSpinner,FaExclamationCircle,} from "react-icons/fa";


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
      render: (text) => (
        <div
          style={{
            maxWidth: 250, // limit width
            whiteSpace: "normal", // allow wrap
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
          title={text} // tooltip with full text
        >
          {text}
        </div>
      ),
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
      <Content className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="dashboard-header">
          <h1 className="dashboard-title font-bold text-xl sm:text-2xl md:text-3xl mb-6">
            Manage and Track Your Tasks
          </h1>
        </div>
        <Row gutter={[16, 16]}>
          {/* Left side: Table */}
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={15}
            className="overflow-auto"
            style={{ minHeight: "300px" }}
          >
            <Card
              title={
                <span className="text-blue-700 font-bold text-lg">
                  📋 Tasks Dashboard
                </span>
              }
              bordered={false}
              className="shadow-lg rounded-xl bg-white"
              bodyStyle={{ padding: "12px" }}
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
                // removed horizontal scroll here!
                size="middle"
              />
            </Card>
          </Col>

          {/* Right side: Two separate cards */}
          <Col xs={24} sm={24} md={12} lg={9}>
            {/* Highlighted Overview */}
            <Card
              title={
                <span className="text-blue-700 font-bold text-lg">
                  📊 Task Overview
                </span>
              }
              bordered={false}
              className="shadow-lg rounded-xl mb-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100"
            >
              <div className="flex justify-around items-center flex-wrap gap-4">
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    percent={completedPercent}
                    strokeColor="#22c55e"
                    width={
                      isNaN(window.innerWidth)
                        ? 80
                        : window.innerWidth < 640
                        ? 60
                        : 80
                    }
                  />
                  <span className="mt-2 font-semibold text-sm text-green-600">
                    Completed
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    percent={inprogressPercent}
                    strokeColor="#3b82f6"
                    width={
                      isNaN(window.innerWidth)
                        ? 80
                        : window.innerWidth < 640
                        ? 60
                        : 80
                    }
                  />
                  <span className="mt-2 font-semibold text-sm text-blue-600">
                    In Progress
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    percent={pendingPercent}
                    strokeColor="#f97316"
                    width={
                      isNaN(window.innerWidth)
                        ? 80
                        : window.innerWidth < 640
                        ? 60
                        : 80
                    }
                  />
                  <span className="mt-2 font-semibold text-sm text-orange-600">
                    Pending
                  </span>
                </div>
              </div>
            </Card>

            {/* Calendar */}
            <Card
              title={
                <span className="text-blue-700 font-bold text-lg">📅 Calendar</span>
              }
              bordered={false}
              style={{ height: "360px", overflowY: "auto" }}
              className="shadow-lg rounded-xl bg-gradient-to-br from-pink-50 via-white to-red-50 border border-pink-100"
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
