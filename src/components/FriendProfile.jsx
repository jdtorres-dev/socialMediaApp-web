import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Avatar, Modal, Image, Spin } from "antd";
import PostService from "../service/PostService";
import PostCards from "./PostCards";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useGetUserById } from "../queries/UserQueries";
import { CiImageOn } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const FriendProfile = ({ userId }) => {  // Accepting userId as a prop
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  const { currentUser } = useAuth();
  const { darkMode } = useTheme();

  const [posts, setPosts] = useState([]);
  const [postAdded, setPostAdded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Use the userId prop for fetching user details
  const { data: user } = useGetUserById(userId); // Fetch user info based on userId passed as prop

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (userId) { // Use userId instead of currentUser.id for fetching posts
      PostService.getPostsByUserId(userId) // Fetch posts for the passed userId
        .then((response) => {
          setIsLoading(false);
          setPosts(response.data);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching posts:", error);
          message.error("Error loading posts.");
        });
    }
  }, [userId, postAdded]);  // Dependency on userId to refetch when it changes

  const beforeUpload = (file) => {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/svg+xml",
    ];
    const isImage = file.type.startsWith("image/");
    const isValidType = allowedTypes.includes(file.type);

    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    if (!isValidType) {
      message.error("You can only upload PNG, JPEG, WebP, or SVG files!");
      return false;
    }

    return true;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file && beforeUpload(file)) {
      const data = new FileReader();
      data.addEventListener("load", () => {
        setImageUrl(data.result);
      });
      data.readAsDataURL(file);
    }
  };

  const showConfirm = (values) => {
    Modal.confirm({
      title: "Are you sure you want to add a post?",
      content: "Once posted, your post will be visible to others.",
      onOk: () => handleSubmit(values),
      onCancel: () => {
        message.info("Post canceled");
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      const requestData = {
        ...values,
        imageUrl: imageUrl,
        user: currentUser,
      };

      await PostService.createPost(requestData);
      setPostAdded((prev) => !prev);

      message.success("Post successfully uploaded!");
      setImageUrl("");
      form.resetFields();
    } catch (error) {
      console.error("Error during form submission:", error);
      message.error("Error uploading post. Please try again.");
    }
  };

  return (
    <>
      {/* Posts */}
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <Spin size="large" />
          <p
            style={{ color: darkMode ? "white" : "black", marginLeft: "10px" }}
          >
            Loading posts...
          </p>
        </div>
      ) : (
        <PostCards posts={posts} setPosts={setPosts} />
      )}
    </>
  );
};

export default FriendProfile;
