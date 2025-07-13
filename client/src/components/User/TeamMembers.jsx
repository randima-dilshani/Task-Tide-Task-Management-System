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
      width: 300,
    },
    {
      title: (
        <span style={{ fontWeight: "bold", fontSize: "15px" }}>
          Email Address
        </span>
      ),
      dataIndex: "email",
      key: "email",
      width: 450,
      ellipsis: true,
    },
  ];

  return (
    <Layout>
      <Sider className="sidebar">
        <Logo />
        <MenuList />
      </Sider>
      <Layout>
        <Content
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 750,
              marginTop: "60px",
              marginBottom: "20px",
            }}
          >
            {/* Beautiful Heading without bullet */}
            <div
              style={{
                backgroundColor: "#e0f2fe",
                padding: "16px 24px",
                borderRadius: "14px",
                boxShadow: "0 8px 20px rgba(14, 165, 233, 0.3)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#0369a1",
                  margin: 0,
                  userSelect: "none",
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
              pagination={{ pageSize: 8, showSizeChanger: false }}
              bordered={false}
              style={{
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
              rowClassName={() =>
                "hover:bg-blue-50 transition-colors duration-300 cursor-pointer"
              }
              scroll={{ x: "100%" }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeamMembers;
