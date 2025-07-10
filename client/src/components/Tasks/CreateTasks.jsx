import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const CreateTaskForm = ({ open, setOpen, getTask }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);

  // Get today's date in YYYY-MM-DD format
  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    getAllUsers();
  }, []);

  // Function to fetch all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/getallusers"
      );
      let users = response.data.users.map((user) => ({
        label: user.username,
        value: user._id,
      }));
      setUsers(users); // Set the users state with fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      console.log("Form values:", values);

      const response = await axios.post(
        "http://localhost:8080/api/v1/task/createTask",
        {
          ...values,
          dueDate: values.dueDate.format("YYYY-MM-DD"),
          assignedDate: today,
        }
      );
      console.log("Task created:", response.data);

      form.resetFields(); // Reset form fields after successful submission
      setOpen(false); // Close the modal after successful submission
      getTask(); // Fetch all tasks to update the tasks list
    } catch (error) {
      console.error("Error creating task:", error);
      // Handle error case here
    }
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form fields when the modal is closed
    setOpen(false); // Close the modal
  };

  return (
    <Modal
      title={<span style={{ fontWeight: "bold" }}>ADD TASK</span>}
      visible={open}
      onOk={handleSubmit} // Call handleSubmit function on OK button click
      onCancel={handleCancel}
      okText="Submit" // Rename OK button to Submit
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="createTaskForm"
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="title"
          label={<span style={{ fontSize: "16px" }}>Task Title :</span>}
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>
        <Form.Item name="description" label="Description :">
          <Input.TextArea placeholder="Enter task description" />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="assignedDate"
            label={<span style={{ fontSize: "16px" }}>Assign Date :</span>}
            initialValue={today}
            style={{ flex: 1, marginRight: 8 }}
          >
            <Input type="date" value={today} disabled />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label={<span style={{ fontSize: "16px" }}>Due Date :</span>}
            rules={[{ required: true, message: "Date is required!" }]}
            style={{ flex: 1, marginLeft: 8 }}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="user"
            label={<span style={{ fontSize: "16px" }}>Assign to :</span>}
            rules={[{ required: true, message: "Please select a user!" }]}
            style={{ flex: 1, marginRight: 8 }}
          >
            <Select placeholder="Select a user" options={users}></Select>
          </Form.Item>
          <Form.Item
            name="status"
            label={<span style={{ fontSize: "16px" }}>Task Stage :</span>}
            initialValue="Pending"
            style={{ flex: 1, marginLeft: 8 }}
          >
            <Select placeholder="Select a Status">
              <Option value="Pending">To Do</Option>
              <Option value="Inprogress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateTaskForm;
