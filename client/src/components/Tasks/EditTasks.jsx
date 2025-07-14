import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import axios from "../../util/axios";

const { Option } = Select;

const EditTasks = ({ open, setOpen, task, handleEditTask }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false); // ✅ flag to show message

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
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
      const response = await axios.get("/user/getallusers");
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
        dueDate: values.dueDate?.toISOString(),
        createdAt: values.createdAt?.toISOString(),
      };

      await axios.put(`/task/updateTask/${task._id}`, updatedTask);
      handleEditTask();
      setSuccessMsg(true); // ✅ show success message

      // Delay modal close to let message show
      setTimeout(() => {
        setSuccessMsg(false);
        setOpen(false);
        form.resetFields();
      }, 1500);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  const handleCancel = () => {
    setSuccessMsg(false);
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", fontSize: "22px" }}>EDIT TASK</span>}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
      cancelText="Cancel"
    >
      {/* ✅ Success Message Box */}
      {successMsg && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "16px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ✅ Task updated successfully!
        </div>
      )}

      <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
        <Form.Item
          name="title"
          label="Task Title"
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input placeholder="Enter task name" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter task description" />
        </Form.Item>

        <div style={{ display: "flex", gap: "12px" }}>
          <Form.Item
            name="createdAt"
            label="Assign Date"
            style={{ flex: 1 }}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} disabled />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Due date is required!" }]}
            style={{ flex: 1 }}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Form.Item
            name="user"
            label="Assign to"
            rules={[{ required: true, message: "Please select a user!" }]}
            style={{ flex: 1 }}
          >
            <Select options={users} placeholder="Select user" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Task Status"
            style={{ flex: 1 }}
          >
            <Select placeholder="Select status">
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
