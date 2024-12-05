import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Row, Col, Tooltip, Modal } from "antd";
import PostService from "../service/PostService";
import PostCards from "./PostCards";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Profile = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  const { currentUser } = useAuth();
  const { darkMode } = useTheme();

  const [posts, setPosts] = useState([]);
  const [postAdded, setPostAdded] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      PostService.getPostsByUserId(currentUser.id)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          message.error("Error loading posts.");
        });
    }
  }, [currentUser]);

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
  }, [postAdded, currentUser]);

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

  useEffect(() => {
    // console.log("Final image URL:", imageUrl);
  }, [imageUrl]);

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
    console.log("Final image URL:", imageUrl);
    console.log("Post Values:", values);
    try {
      const requestData = {
        ...values,
        imageUrl: imageUrl,
        user: currentUser,
      };
      console.log(requestData);

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
          maxWidth: 550,
          margin: "0 auto",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          form={form}
          name="add_post"
          onFinish={showConfirm}
          initialValues={{
            remember: true,
          }}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col span={24}>
              <label style={{ color: darkMode ? "White" : "Black" }}>
                What's on your mind?
              </label>
              <Form.Item
                name="body"
                rules={[{ required: true, message: "Please input your post!" }]}
              >
                <Input
                  placeholder="What's on your mind?"
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Row gutter={24}>
            <Col
              span={19}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 5,
                color: "#fff",
              }}
            >
              <Tooltip title="Upload an image" placement="topLeft">
                <input
                  name="image"
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                  style={{
                    whiteSpace: "wrap",
                    marginBottom: 5,
                    width: "100%",
                    color: darkMode ? "#333" : "#fff",
                    fontWeight: 400,
                  }}
                />
              </Tooltip>
            </Col>
            <Col
              span={5}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 0,
                marginBottom: -5,
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
            </Col>
          </Row>
        </Form>
      </div>
      <PostCards posts={posts} setPosts={setPosts} />
    </>
  );
};

export default Profile;
