import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  Typography,
  Modal,
  Form,
  Input,
  message,
  Button,
  Tooltip,
} from "antd";
import { useTheme } from "../context/ThemeContext";
import PostService from "../service/PostService";

import "../styles/Modal.css";

const { TextArea } = Input;
const UpdatePost = ({ onOpen, onClose, post, onPostUpdate }) => {
  const { darkMode } = useTheme();

  const [form] = Form.useForm();
  const [image, setImage] = useState(post.imageUrl || "");

  useEffect(() => {
    if (onOpen) {
      form.setFieldsValue({
        body: post?.body,
        imageUrl: post?.imageUrl,
      });
    }
  }, [onOpen, form, post]);

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
        setImage(data.result);
      });
      data.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // console.log("Final image URL:", image);
  }, [image, post]);

  const showConfirmUpdate = () => {
    Modal.confirm({
      title: "Update Post",
      content: "Are you sure you want to update your post?",
      onOk: async () => {
        try {
          const formValues = form.getFieldsValue();
          const updatedPost = {
            id: post.id,
            body: formValues.body,
            imageUrl: image,
            user: post.user,
            createdDate: post.createdDate,
            isDelete: post.isDelete,
          };

          await PostService.updatePostById(post.id, updatedPost);
          onPostUpdate(updatedPost);

          onClose();
          message.success("Successfully updated post.");
        } catch (error) {
          console.error("Error", error);
          onClose();
          message.error(
            "An error occurred while updating post. Please try again later."
          );
        }
      },
      onCancel: () => onClose(),
    });
  };

  return (
    <Modal
      className={darkMode ? "ant-modal-dark" : ""}
      open={onOpen}
      onCancel={onClose}
      onOk={showConfirmUpdate}
      closable={false}
      width={600}
      okButtonProps={{
        style: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      cancelButtonProps={{
        style: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      okText="Confirm"
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
            fontWeight: "600",
            paddingRight: "3px",
            paddingLeft: "5px",
            color: darkMode ? "white" : "black",
          }}
        >
          {post.user ? post.user.name : "Unknown"}
        </Typography>

        <Typography
          level={4}
          style={{
            fontSize: "11px",
            color: darkMode ? "white" : "black",
          }}
        >
          @{post.user ? post.user.username : "Unknown"}
        </Typography>
      </div>

      <br />
      <div style={{ marginTop: -10, marginBottom: 10 }}>
        What's on your mind?
      </div>
      <div>
        <Form
          form={form}
          name="update_post_form"
          onFinish={showConfirmUpdate}
          onFinishFailed={(errorInfo) => {
            console.log("Form submission failed:", errorInfo);
          }}
        >
          <Form.Item
            label=""
            name="body"
            rules={[{ required: true, message: "Please input your post!" }]}
          >
            <TextArea
              autoSize={{ minRows: 2, maxRows: 3 }}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          {image ? (
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
              <div>
                <img
                  alt="example"
                  src={image}
                  style={{
                    width: 250,
                    height: 250,
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          ) : null}

          {/* upload file */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Tooltip title="Upload an image" placement="topLeft">
              <input
                type="file"
                onChange={handleImageUpload}
                style={{
                  whiteSpace: "wrap",
                  width: "100%",
                  color: darkMode ? "#333" : "white",
                }}
              />
            </Tooltip>
            {image && (
              <Button
                onClick={() => setImage("")}
                style={{
                  height: "22px",
                  fontSize: "13px",
                  backgroundColor: "lightgray",
                  border: "1px solid black",
                  borderRadius: "2px",
                }}
              >
                Remove image
              </Button>
            )}
          </div>
        </Form>
      </div>
      <Divider
        style={{
          borderColor: darkMode ? "white" : "gray",
          marginTop: 0,
          marginBottom: 15,
          height: 5,
        }}
      />
    </Modal>
  );
};

export default UpdatePost;
