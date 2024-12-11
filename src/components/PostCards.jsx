import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Image,
  Typography,
  Menu,
  Modal,
  Dropdown,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { PiDotsThreeBold } from "react-icons/pi";
import PostService from "../service/PostService";
import LikeUnlikePost from "./LikeUnlikePost";
import UpdatePost from "./UpdatePost";
import { IoEyeOutline } from "react-icons/io5";

const PostCards = ({ posts, setPosts }) => {
  const { darkMode } = useTheme();
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const deletePostById = async (postId, post) => {
    try {
      await PostService.deletePostById(postId, post);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
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
    setSelectedPost(null);
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
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

  return (
    <>
      <div style={{ width: 530, margin: "0 auto", padding: "15px" }}>
        {/* Display each post in a Card */}
        {posts.map((post) => (
          <Card
            key={post.id}
            style={{
              marginBottom: "20px",
              border: "1px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: darkMode ? "#3b3b3b" : "White",
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
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/profile/${post.user?.id}`)} // Redirect to the user's profile page
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
                textAlign: "left",
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

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                <LikeUnlikePost post={post} />
              </div>

              <div
                style={{
                  borderLeft: "1px solid lightgray",
                  height: 20,
                  marginTop: 15,
                }}
              ></div>

              <div>
                {/* View Post Button */}
                <Button
                  type="secondary"
                  style={{
                    marginTop: "10px",
                    color: darkMode ? "white" : "black",
                  }}
                  block
                  onClick={() => navigate(`/post/${post.id}`)}
                  icon={<IoEyeOutline style={{ fontSize: 20 }} />}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedPost && (
        <UpdatePost
          post={selectedPost}
          onClose={handleModalClose}
          onOpen={isModalVisible}
          onPostUpdate={handlePostUpdate}
        />
      )}
    </>
  );
};

export default PostCards;
