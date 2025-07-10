import React, { useState, useEffect } from "react";
import { Layout, Table } from "antd";
import Logo from "../Sidebar/Logo";
import MenuList from "../Sidebar/MenuList";
import axios from "axios";

const { Sider, Content } = Layout;

const TeamMembers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/getallusers"
      );
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "15px" }}>Full Name</span>
      ),
      dataIndex: "username",
      key: "username",
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "15px" }}>
          Email Address
        </span>
      ),
      dataIndex: "email",
      key: "email",
    },
    // Add more columns as needed
  ];

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "60px",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Team Members
            </h1>
          </div>

          <Table
            dataSource={users}
            columns={columns}
            loading={loading}
            rowKey="_id"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeamMembers;
