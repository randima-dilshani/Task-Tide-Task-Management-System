import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import MenuList from "../Sidebar/MenuList";
import Logo from "../Sidebar/Logo";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";
import TaskImage from "../../assets/images/task.jpeg";

const { Sider, Content } = Layout;

const SpecificTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const taskId = params.taskId;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/task/getTask/${taskId}`
        );
        const taskData = response.data;
        setTitle(taskData.title);
        setDescription(taskData.description);
        setStatus(taskData.status);
        setDueDate(new Date(taskData.dueDate).toISOString().split("T")[0]);
        setCreatedAt(new Date(taskData.createdAt).toISOString().split("T")[0]);

        setAssignedUser(taskData.user?.username || "Unassigned");
        setCreatedBy(taskData.createdBy?.username || "Unknown");
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [taskId]);

  const goBack = () => {
    navigate("/taskdetails");
  };

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content>
          <div className="h-[100vh] flex items-center justify-center px-5 lg:px-0">
            <div className="max-w-screen-xl min-h-[700px] bg-blue-50 border shadow sm:rounded-lg flex justify-center flex-1 relative">
              {/* 🔙 Back Button */}
              <button
                onClick={goBack}
                className="absolute top-5 left-5 flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-full shadow-sm transition-all duration-300"
              >
                <ArrowLeftOutlined className="text-blue-700 text-sm" />
                <span className="text-sm">Back</span>
              </button>

              <div className="flex-1 bg-violet-10 text-center hidden md:flex">
                <div className="m-6 xl:m-8 w-full bg-contain bg-center bg-no-repeat">
                  <img
                    src={TaskImage}
                    alt="Task"
                    draggable={false}
                    style={{ marginTop: "80px" }}
                  />
                </div>
              </div>

              <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col">
                <div className="flex flex-col items-center flex-grow">
                  <div className="text-center">
                    <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                      Task Details
                    </h1>
                  </div>
                  <div className="w-full mt-12 flex-grow flex flex-col justify-between">
                    <div className="flex flex-col gap-4 max-h-[460px] overflow-y-auto pr-2">
                      <div className="flex flex-col">
                        <label htmlFor="title" className="text-gray-700">
                          Title:
                        </label>
                        <input
                          id="title"
                          type="text"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none"
                          value={title}
                          readOnly
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-700">
                          Description:
                        </label>
                        <textarea
                          id="description"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none resize-none"
                          value={description}
                          readOnly
                          rows={6}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="assignedUser" className="text-gray-700">
                          Assigned User:
                        </label>
                        <input
                          id="assignedUser"
                          type="text"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none"
                          value={assignedUser}
                          readOnly
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="createdBy" className="text-gray-700">
                          Created By:
                        </label>
                        <input
                          id="createdBy"
                          type="text"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none"
                          value={createdBy}
                          readOnly
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="status" className="text-gray-700">
                          Status:
                        </label>
                        <input
                          id="status"
                          type="text"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none"
                          value={status}
                          readOnly
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="dueDate" className="text-gray-700">
                          Due Date:
                        </label>
                        <input
                          id="dueDate"
                          type="text"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none"
                          value={dueDate}
                          readOnly
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="createdAt" className="text-gray-700">
                          Created At:
                        </label>
                        <input
                          id="createdAt"
                          type="text"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none"
                          value={createdAt}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="w-full mt-5">
                      <Button type="primary" danger block onClick={goBack}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SpecificTask;
