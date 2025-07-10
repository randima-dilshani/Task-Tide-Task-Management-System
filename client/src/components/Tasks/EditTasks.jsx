import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const EditTasks = ({ open, setOpen, task, handleEditTask }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: null,
    createdAt: null,
    user: "",
  });

  useEffect(() => {
    if (task) {
      setInitialValues({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: dayjs(task.dueDate),
        createdAt: dayjs(task.createdAt),
        user: task.user,
      });
    }
    getAllUsers();
  }, [task]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/getallusers"
      );
      const usersData = response.data.users.map((user) => ({
        label: user.username,
        value: user._id,
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedTask = {
        ...task,
        ...values,
        dueDate: values.dueDate ? values.dueDate.toISOString() : null,
        createdAt: values.createdAt ? values.createdAt.toISOString() : null,
      };
      await axios.put(
        `http://localhost:8080/api/v1/task/updateTask/${task._id}`,
        updatedTask
      );
      handleEditTask();
      form.resetFields();
      setOpen(false);
      message.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      message.error("Failed to update task");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title={
        <span style={{ fontWeight: "bold", fontSize: "25px" }}>EDIT TASK</span>
      }
      visible={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="editTaskForm"
        style={{ marginTop: 20 }}
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label={<span style={{ fontSize: "16px" }}>Task Title :</span>}
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input placeholder="Enter task name" />
        </Form.Item>
        <Form.Item name="description" label="Description :">
          <Input.TextArea placeholder="Enter task description" />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="createdAt"
            label={<span style={{ fontSize: "16px" }}>Assign Date :</span>}
            style={{ flex: 1, marginRight: 8 }}
          >
            <DatePicker
              value={initialValues.createdAt}
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
              disabled
            />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label={<span style={{ fontSize: "16px" }}> Due Date :</span>}
            rules={[{ required: true, message: "Date is required!" }]}
            style={{ flex: 1, marginLeft: 8 }}
          >
            <DatePicker
              value={initialValues.dueDate}
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            name="user"
            label={<span style={{ fontSize: "16px" }}>Assign to :</span>}
            rules={[{ required: true, message: "Please select a user!" }]}
            style={{ flex: 1, marginRight: 8 }}
          >
            <Select options={users}></Select>
          </Form.Item>
          <Form.Item
            name="status"
            label={<span style={{ fontSize: "16px" }}>Task Stage :</span>}
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

export default EditTasks;
