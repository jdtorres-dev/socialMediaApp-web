import React, { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  Image,
  Typography,
  Spin,
  Dropdown,
  message,
  Modal,
  Menu,
} from "antd";
import AddComment from "./AddComment";
import { useTheme } from "../context/ThemeContext";
import LikeUnlikePost from "./LikeUnlikePost";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PostService from "../service/PostService";
import { PiDotsThreeBold } from "react-icons/pi";
import UpdatePost from "./UpdatePost";

const ViewPost = ({ setPost, post, setPosts, onPostUpdate }) => {
  const { darkMode } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(post);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const deletePostById = async (postId, post) => {
    try {
      await PostService.deletePostById(postId, post);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      navigate(-1);
      message.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post", error);
      message.error("Error deleting post. Please try again.");
    }
  };

  const showDeleteConfirm = (postId, post) => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => deletePostById(postId, post),
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setPost(post);
    setIsModalVisible(true);
  };

  const settingsMenu = (postId, post) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEditClick(post)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => showDeleteConfirm(postId, post)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (post === null) {
      const timeoutId = setTimeout(() => {
        navigate("/not-found");
      }, 10000);
      return () => clearTimeout(timeoutId);
    }
  }, [post, navigate]);

  if (post === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <Spin size="large" />
        <p style={{ color: darkMode ? "white" : "black", marginLeft: "10px" }}>
          Loading post...
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: 500, margin: "0 auto", padding: "15px" }}>
        <Card
          key={post.id}
          style={{
            marginBottom: "20px",
            border: "1px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: darkMode ? "#3b3b3b" : "White"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar src={post.user?.imageUrl}>
                {!post.user?.imageUrl && post.user?.username
                  ? post.user.username.charAt(0).toUpperCase()
                  : null}
              </Avatar>

              <Typography
                level={4}
                style={{
                  color: darkMode ? "white" : "black",
                  fontWeight: "600",
                  paddingRight: "3px",
                  paddingLeft: "5px",
                }}
              >
                {post.user ? post.user.name : "Unknown"}
              </Typography>

              <Typography
                level={4}
                style={{
                  color: darkMode ? "white" : "black",
                  fontSize: "11px",
                }}
              >
                @{post.user ? post.user.username : "Unknown"}
              </Typography>
            </div>
            <div>
              {post.user.id === Number(currentUser.id) && (
                <Dropdown
                  style={{
                    position: "absolute",
                    border: "0px",
                  }}
                  overlay={settingsMenu(post.id, post)}
                  trigger={["click"]}
                >
                  <PiDotsThreeBold
                    style={{
                      color: darkMode ? "lightgray" : "blue",
                      fontSize: "20px",
                    }}
                  />
                </Dropdown>
              )}
            </div>
          </div>
          {/* Post Created Date */}
          <Typography
            type="secondary"
            style={{
              fontSize: "0.6rem",
              textAlign: "right",
              color: darkMode ? "white" : "black",
            }}
          >
            {post.createdDate
              ? new Date(post.createdDate).toLocaleString()
              : "No date available"}
          </Typography>

          {/* Post Body */}
          <Typography
            style={{
              color: darkMode ? "white" : "black",
            }}
          >
            {post.body}
          </Typography>

          {/* Post Image */}
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="Post image"
              style={{
                width: 450,
                height: 350,
                objectFit: "cover",
                marginBottom: "15px",
                marginTop: "15px",
              }}
              preview={true}
            />
          )}
          <LikeUnlikePost post={post} />
        </Card>
        <AddComment postDetails={post} />
      </div>

      {selectedPost && (
        <UpdatePost
          post={selectedPost}
          onClose={handleModalClose}
          onOpen={isModalVisible}
          onPostUpdate={onPostUpdate}
        />
      )}
    </>
  );
};

export default ViewPost;
