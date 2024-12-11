import React, { useState } from "react";
import { Avatar, Typography, Divider, Button, Image } from "antd";
import { UserOutlined, HeartOutlined } from "@ant-design/icons";
import IconWithTextCard from "../components/IconWithTextCard";
import { useTheme } from "../context/ThemeContext";

import UserModal from "../components/UserModal";

// get details
import { useAuth } from "../context/AuthContext";
import { useGetUserById } from "../queries/UserQueries";

import "../styles/ProfilePage.css";

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
            padding: "0px",
            width: "auto",
          }}
        >
          <div className="container">
            <div
              className="profile-container"
              style={{
                backgroundImage: `url(${data?.imageUrl || "fallback.jpg"})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center", 
                borderRadius: "10px", // Add border radius here
              }}
            >
            </div>
            <div class="bottom-left">
              <div style={{ fontSize: "24px", fontWeight: 500 }}> {data?.name} </div>
              <div style={{ fontSize: "16px" }}> @{data?.username}</div>
              <div style={{ fontSize: "16px" }}>{data?.bio}</div>
            </div>
          </div>

          <div class="text-justified" style={{ color: darkMode ? "White" : "Black" }}>
            Things I like: {data?.interest}
          </div>

        </div>

        <Divider />

        {/* Navigation Section */}
        <div
          style={{
            display: "flex", // Use flexbox
            flexDirection: "column", // Arrange items vertically
            alignItems: "center", // Center horizontally
            marginBottom: "10px",
          }}
        >
          <IconWithTextCard
            icon={
              <UserOutlined style={{ fontSize: "32px", color: "#1890ff" }} />
            }
            title={
              <span style={{ color: darkMode ? "White" : "Black" }}>
                Friends
              </span>
            }
            description={
              <span style={{ color: darkMode ? "White" : "Black" }}>
                1,400
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

        <div>
            {userId == currentUser?.id && (
              <Button
                type="primary"
                style={{
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
                onClick={() => setUpdateUser(true)}
              >
                Edit Profile
              </Button>
            )}
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
