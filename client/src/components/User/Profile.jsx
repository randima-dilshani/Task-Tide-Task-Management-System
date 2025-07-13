import React from "react";
import { Card, Avatar, Descriptions, Button } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

const Profile = () => {
  // You can replace this mock data with actual user data
  const user = {
    name: "Randima Dilshani",
    email: "randima@example.com",
    role: "Software Engineer",
    joined: "2024-03-29",
    avatar: "",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <Card
        title="My Profile"
        style={{ maxWidth: 500, width: "100%", borderRadius: "16px" }}
        actions={[
          <Button icon={<EditOutlined />} type="primary">
            Edit Profile
          </Button>,
        ]}
      >
        <div className="flex flex-col items-center mb-6">
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={user.avatar || null}
            style={{ marginBottom: 16 }}
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.role}</p>
        </div>

        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
          <Descriptions.Item label="Joined Date">{user.joined}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile;
