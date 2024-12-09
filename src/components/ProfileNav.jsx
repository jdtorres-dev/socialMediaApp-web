import React from "react";
import { Layout, Avatar, Typography, Divider, Menu, Button } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  MessageOutlined,
  SettingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import IconWithTextCard from "../components/IconWithTextCard";

const { Sider } = Layout;
const { Title, Text } = Typography;

const handleClick = () => {
  console.log("Edit Profile button clicked!");
  // Add your logic here
};

const ProfileNav = () => {
  return (
    < div className="profileNav-container"
      // style={{
        // display: "flex",
        // flexDirection: "column",
        // width: "350px",
        // margin: "0 auto",
        // padding: "15px",
        // borderRadius: "8px",
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      // }}
    >
      {/* Profile Section */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Avatar
          size={100}
          icon={<UserOutlined />}
          style={{ marginBottom: "10px" }}
        />
        <Title level={4}>John Doe</Title>
        <Text type="secondary">@johndoe</Text>
        <Title level={5}>This is my bio.</Title>
        <Button
          type="primary"
          style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          onClick={handleClick}
        >
          Edit Profile
        </Button>
      </div>

      <Divider />

      {/* Navigation Section */}
      <div
          style={{
              display: "flex", // Use flexbox
              flexDirection: "column", // Arrange items vertically
              alignItems: "center", // Center horizontally
              marginBottom: "20px",
          }}
      >
        <IconWithTextCard
          icon={
            <UserOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
          }
          title="Followers"
          description="25,400"
        />
        <IconWithTextCard
          icon={
            <HeartOutlined style={{ fontSize: "32px", color: "#ff4d4f" }} />
          }
          title="Likes"
          description="15,200"
        />
      </div>
    </div>
  );
};

export default ProfileNav;
