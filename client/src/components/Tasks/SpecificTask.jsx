import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import MenuList from "../Sidebar/MenuList";
import Logo from "../Sidebar/Logo";
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskImage from "../../assets/images/task.jpeg";

const { Sider, Content } = Layout;

const SpecificTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const params = useParams();
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
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [taskId]);

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content>
          <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
            <div className="max-w-screen-xl h-[640px] bg-white border shadow sm:rounded-lg flex justify-center flex-1">
              <div className="flex-1 bg-violet-10 text-center hidden md:flex">
                <div className="m-6 xl:m-8 w-full bg-contain bg-center bg-no-repeat">
                  <img
                    src={TaskImage}
                    alt="login"
                    draggable={false}
                    style={{ marginTop: "80px" }}
                  />
                </div>
              </div>
              <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div className="flex flex-col items-center">
                  <div className="text-center">
                    <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                      Task Details
                    </h1>
                  </div>
                  <div className="w-full mt-12">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <label htmlFor="title" className="text-gray-700">
                          Title:
                        </label>
                        <input
                          id="title"
                          type="text"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          value={title}
                          readOnly
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-700">
                          Description:
                        </label>
                        <input
                          id="description"
                          type="text"
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          value={description}
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
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
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
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
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
                          className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                          value={createdAt}
                          readOnly
                        />
                        <div className="w-full mt-5">
                          <a href="/taskdetails">
                            <Button type="primary" danger block>
                              Cancel
                            </Button>
                          </a>
                        </div>
                      </div>
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
