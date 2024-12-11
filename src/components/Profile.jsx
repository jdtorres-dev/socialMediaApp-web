import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Avatar, Modal, Image, Spin } from "antd";
import PostService from "../service/PostService";
import PostCards from "./PostCards";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useGetUserById } from "../queries/UserQueries";
import { CiImageOn } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

const { TextArea } = Input;

const Profile = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  const { currentUser } = useAuth();
  const { darkMode } = useTheme();

  const [posts, setPosts] = useState([]);
  const [postAdded, setPostAdded] = useState(false);
  const { data: user } = useGetUserById(currentUser.id);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (currentUser?.id) {
      PostService.getPostsByUserId(currentUser.id)
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
  }, [currentUser, user]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!currentUser?.id) {
        console.error("No user ID found. Unable to fetch posts.");
        return;
      }

      try {
        const fetchedPosts = await PostService.getPostsByUserId(currentUser.id);
        setPosts(fetchedPosts.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentUser, postAdded, user]);

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "500px",
          margin: "0 auto",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Avatar */}
        <div style={{ width: "50px" }}>
          <Avatar
            src={user?.imageUrl}
            style={{ height: 50, width: 50, fontSize: 20 }}
          >
            {!user?.imageUrl && user?.username
              ? user.username.charAt(0).toUpperCase()
              : null}
          </Avatar>
        </div>

        {/* Form */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
            paddingLeft: 10,
            paddingRight: 15,
          }}
        >
          {/* What's on your mind */}
          <div
            style={{
              fontWeight: 400,
              fontSize: 14,
              alignContent: "center",
              color: darkMode ? "lightgray" : "black",
            }}
          >
            What's on your mind?
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                width: "100%",
                height: 280,
                marginTop: -5,
              }}
            >
              <Image
                alt="preview"
                src={imageUrl}
                style={{
                  width: 250,
                  height: 250,
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          {/* Text Area */}
          <div
            style={{
              width: "100%",
            }}
          >
            <Form
              form={form}
              name="add_post"
              onFinish={showConfirm}
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="body"
                rules={[
                  { required: true, message: "Please input your post!" },
                  {
                    min: 1,
                    message: "Post must be at least 1 character.",
                  },
                  {
                    max: 255,
                    message: "Post must be less than 255 characters.",
                  },
                ]}
              >
                <TextArea
                  autoSize={{ minRows: 1, maxRows: 3 }}
                  style={{
                    backgroundColor: "transparent",
                    color: darkMode ? "white" : "black",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderRadius: 0,
                    borderBottom: "1px solid lightgray",
                    fontSize: "12px",
                  }}
                />
              </Form.Item>
            </Form>
          </div>

          {/* Upload */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Image Upload Button */}
            <div>
              <label
                htmlFor="file-upload"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  width: 30,
                  height: 25,
                  color: darkMode ? "#fff" : "gray",
                }}
              >
                <CiImageOn style={{ fontSize: "25px", marginTop: -20 }} />
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleImageUpload}
                style={{
                  display: "none",
                }}
              />
            </div>

            {imageUrl !== "" && (
              <div
                style={{
                  marginTop: -18,
                  marginLeft: -0,
                }}
              >
                <Button
                  type="secondary"
                  onClick={() => setImageUrl("")}
                  style={{
                    width: 30,
                    height: 25,
                    padding: 0,
                    // border: "none",
                    // boxShadow: "none",
                    // backgroundColor: "transparent",
                  }}
                  icon={
                    <GoTrash
                      style={{
                        fontSize: 20,
                        color: "#FF7276",
                      }}
                    />
                  }
                />
              </div>
            )}

            {/* Submit Button */}
            <div style={{ marginLeft: "auto" }}>
              <Form
                form={form}
                name="add_post"
                onFinish={showConfirm}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{ borderRadius: "8px" }}
                  >
                    Post
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>

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

export default Profile;
