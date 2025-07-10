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

const { Sider, Content } = Layout;

const TASK_TYPE = {
  pending: "bg-blue-600",
  inprogress: "bg-yellow-600",
  completed: "bg-green-600",
};

const TaskDetails = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

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

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/task/deleteTask/${id}`
      );
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task._id !== id));
        setIsDeleteModalOpen(false);
        message.success("Task deleted successfully");
      } else {
        message.error("Failed to delete the task");
      }
    } catch (error) {
      message.error("Failed to delete the task");
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleEditTask = () => {
    fetchTasks();
    setIsEditModalOpen(false);
  };

  const handleEditButtonClick = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <div className="header-container">
            <h1 className="header-title">Tasks</h1>
            <div className="header-buttons">
              <Badge
                count={5}
                style={{ marginLeft: "30px", marginRight: "13px" }}
              >
                <Avatar style={{ marginRight: "13px" }}>
                  <BellOutlined style={{ fontSize: "25px" }} />
                </Avatar>
              </Badge>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={toggleModal}
              >
                Create Task
              </Button>
            </div>
          </div>
          {open && (
            <CreateTasks open={open} setOpen={setOpen} getTask={fetchTasks} />
          )}
          <div className="tasks-container">
            <Row gutter={[16, 16]}>
              {["Pending", "Inprogress", "Completed"].map((status, index) => (
                <Col xs={24} sm={24} md={12} lg={8} key={index}>
                  <Card
                    style={{
                      backgroundColor:
                        status === "Pending"
                          ? "#D5D6EA"
                          : status === "Inprogress"
                          ? "#C9DFEC"
                          : "#DBE9FA",
                    }}
                    title={
                      <span>
                        <span
                          className={`rounded-full w-3 h-3 inline-block mr-2 ${
                            TASK_TYPE[status.toLowerCase()]
                          }`}
                        />
                        {status}
                      </span>
                    }
                    bordered={false}
                  >
                    {tasks
                      .filter(
                        (task) =>
                          task.status.toLowerCase() === status.toLowerCase()
                      )
                      .map((task) => (
                        <Card
                          key={task._id}
                          className="task-card"
                          title={
                            <div className="task-card-title">
                              <div>
                                <span
                                  className={`rounded-full w-3 h-3 inline-block mr-2 ${
                                    TASK_TYPE[status.toLowerCase()]
                                  }`}
                                />
                                {task.title}
                                <div className="task-due-date">
                                  Due Date:{" "}
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="task-card-actions">
                                <Button
                                  type="link"
                                  icon={
                                    <EyeOutlined style={{ color: "purple" }} />
                                  }
                                  href={`/getTask/${task._id}`}
                                />
                                <Button
                                  type="link"
                                  icon={
                                    <EditOutlined style={{ color: "green" }} />
                                  }
                                  onClick={() => handleEditButtonClick(task)}
                                />
                                <Popconfirm
                                  title="Delete the task"
                                  description="Are you sure to delete this task?"
                                  onConfirm={() => {
                                    handleDeleteTask(task._id);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <Button
                                    type="link"
                                    icon={
                                      <DeleteOutlined
                                        style={{ color: "red" }}
                                      />
                                    }
                                  />
                                </Popconfirm>
                              </div>
                            </div>
                          }
                        >
                          <p className="task-description">{task.description}</p>
                          <div className="task-created-at">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </div>
                        </Card>
                      ))}
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
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
  );
};

export default TaskDetails;
