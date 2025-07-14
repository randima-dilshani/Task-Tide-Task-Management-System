import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Row, Col } from "antd"; 
import moment from "moment";
import axios from "../../util/axios"; 

const { Option } = Select;

const CreateTaskForm = ({ open, setOpen, getTask }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // new state

  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/user/getallusers");
      const formattedUsers = response.data.users.map((user) => ({
        label: user.username,
        value: user._id,
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("token");

      await axios.post(
        "/task/createTask",
        {
          ...values,
          dueDate: values.dueDate.format("YYYY-MM-DD"),
          assignedDate: today,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Task created successfully!");  // show success message

      form.resetFields();

      setTimeout(() => {
        setSuccessMessage("");  // clear message after 3 seconds
        setOpen(false);
        getTask();
      }, 3000);

    } catch (error) {
      console.error("Error creating task:", error);
      setSuccessMessage("Failed to create task. Please try again.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setSuccessMessage("");
  };

  return (
    <Modal
      title={<span className="text-lg font-semibold text-blue-900">Add New Task</span>}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="createTaskForm" className="pt-4">
        {/* Success message block */}
        {successMessage && (
          <div
            style={{
              marginBottom: "16px",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: successMessage.includes("success") ? "#d4edda" : "#f8d7da",
              color: successMessage.includes("success") ? "#155724" : "#721c24",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {successMessage}
          </div>
        )}

        <Form.Item
          name="title"
          label="Task Title"
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter task description" rows={3} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Assigned Date">
              <Input value={today} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true, message: "Due date is required!" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="user"
              label="Assign to"
              rules={[{ required: true, message: "Please select a user!" }]}
            >
              <Select placeholder="Select user" options={users} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="status"
              label="Task Stage"
              initialValue="Pending"
            >
              <Select placeholder="Select task status">
                <Option value="Pending">To Do</Option>
                <Option value="Inprogress">In Progress</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateTaskForm;
