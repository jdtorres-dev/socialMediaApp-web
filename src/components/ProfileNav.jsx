import React, { useState } from "react";
import { Layout, Avatar, Typography, Divider, Menu, Button, Image} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  MessageOutlined,
  SettingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import IconWithTextCard from "../components/IconWithTextCard";

import UserModal from "../components/UserModal";

// get details
import { useAuth } from "../context/AuthContext";
import { useGetUserById } from "../queries/UserQueries";

const { Sider } = Layout;
const { Title, Text } = Typography;

const handleClick = () => {
  console.log("Edit Profile button clicked!");
  // Add your logic here

};

const ProfileNav = () => {

  const [updateUser, setUpdateUser] = useState(false);

  // get details
  const { currentUser } = useAuth();
  const { data, isLoading, isError } = useGetUserById(currentUser.id);


  return (
    <>
      <div className="profileNav-container">
        {/* Profile Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
            width: "auto",
          }}
        >
          <Image
                width={120} // Set the size for the preview
                preview={true} // Enable preview mode
                src={data?.imageUrl || null}// Avatar source
                style={{ borderRadius: '50%', marginBottom: "10px"}} // Make the image circular
              />
          <Text strong style={{ fontSize: "16px" }}>
            {data?.name}
          </Text>
          <Text type="secondary" style={{ fontSize: "14px" }}>
            {data?.username}
          </Text>
          <Text type="primary" style={{ fontSize: "14px" }}>
            This is my bio.
          </Text>
          <Button
            type="primary"
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff", marginTop: "20px"}}
            onClick={() => setUpdateUser(true)}
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

      <UserModal
        isModalOpen={updateUser}
        onClose={() => setUpdateUser(false)}
      />
    </>
  );
};

export default ProfileNav;
