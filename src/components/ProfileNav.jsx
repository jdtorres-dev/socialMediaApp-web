import React, { useState } from "react";
import { Avatar, Typography, Divider, Button } from "antd";
import { UserOutlined, HeartOutlined } from "@ant-design/icons";
import IconWithTextCard from "../components/IconWithTextCard";
import { useTheme } from "../context/ThemeContext";

import UserModal from "../components/UserModal";

// get details
import { useAuth } from "../context/AuthContext";
import { useGetUserById } from "../queries/UserQueries";
const { Text } = Typography;

const ProfileNav = ({ userId }) => {
  const { darkMode } = useTheme();
  const [updateUser, setUpdateUser] = useState(false);

  // get details
  const { currentUser } = useAuth();
  const { data } = useGetUserById(userId);

  return (
    <>
      <div
        className="profileNav-container"
        style={{ backgroundColor: darkMode ? "#3b3b3b" : "White" }}
      >
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
          <Avatar
            src={data?.imageUrl}
            style={{
              borderRadius: "50%",
              marginBottom: "10px",
              width: 120,
              height: 120,
              fontSize: 100,
            }}
          >
            {!data?.imageUrl && data?.username
              ? data?.username.charAt(0).toUpperCase()
              : null}
          </Avatar>

          {/* <Image
                width={120} // Set the size for the preview
                preview={true} // Enable preview mode
                src={data?.imageUrl || null}// Avatar source
               // Make the image circular
              /> */}
          <Text
            strong
            style={{ fontSize: "16px", color: darkMode ? "White" : "Black" }}
          >
            {data?.name}
          </Text>
          <Text
            type="secondary"
            style={{ fontSize: "14px", color: darkMode ? "White" : "Black" }}
          >
            @{data?.username}
          </Text>
          <Text
            type="primary"
            style={{ fontSize: "13px", color: darkMode ? "White" : "darkgray" }}
          >
            This is my bio.
          </Text>
          <div>
            {userId == currentUser?.id && (
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  marginTop: "20px",
                }}
                onClick={() => setUpdateUser(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
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
            title={
              <span style={{ color: darkMode ? "White" : "Black" }}>
                Followers
              </span>
            }
            description={
              <span style={{ color: darkMode ? "White" : "Black" }}>
                25,400
              </span>
            }
          />
          <br />
          <IconWithTextCard
            icon={
              <HeartOutlined
                style={{
                  fontSize: "32px",
                  color: "#ff4d4f",
                }}
              />
            }
            title={
              <span style={{ color: darkMode ? "White" : "Black" }}>Likes</span>
            }
            description={
              <span style={{ color: darkMode ? "White" : "Black" }}>
                15,200
              </span>
            }
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
