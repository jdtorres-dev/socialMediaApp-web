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
import { useTheme } from "../context/ThemeContext";

import UserModal from "../components/UserModal";

// get details
import { useAuth } from "../context/AuthContext";
import { useGetUserById } from "../queries/UserQueries";
const { Text } = Typography;

const ProfileNav = () => {
  const { darkMode } = useTheme();
  const [updateUser, setUpdateUser] = useState(false);

  // get details
  const { currentUser } = useAuth();
  const { data, isLoading, isError } = useGetUserById(currentUser.id);


  return (
    <>
      <div className="profileNav-container" style={{backgroundColor: darkMode ? "#3b3b3b" : "White"}}>
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
          <Text strong style={{ fontSize: "16px", color: darkMode ? "White": "Black"}}>
            {data?.name}
          </Text>
          <Text type="secondary" style={{ fontSize: "14px", color: darkMode ? "White": "Black" }}>
            {data?.username}
          </Text>
          <Text type="primary" style={{ fontSize: "14px", color: darkMode ? "White": "Black" }}>
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
            title={<span style={{color: darkMode ? "White": "Black"}}>Followers</span>}
            description={<span style={{color: darkMode ? "White": "Black"}}>25,400</span>}
          />
          <IconWithTextCard
            icon={
              <HeartOutlined style={{ fontSize: "32px", color: "#ff4d4f" }} />
            }
            title={<span style={{color: darkMode ? "White": "Black"}}>Likes</span>}
            description={<span style={{color: darkMode ? "White": "Black"}}>15,200</span>}
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
