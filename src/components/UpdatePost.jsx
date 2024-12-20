import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  Image,
  Typography,
  Modal,
  Form,
  Input,
  message,
  Button,
} from "antd";
import { useTheme } from "../context/ThemeContext";
import PostService from "../service/PostService";
import { CiImageOn } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

import "../styles/Modal.css";

const { TextArea } = Input;
const UpdatePost = ({ onOpen, onClose, post, onPostUpdate }) => {
  const { darkMode } = useTheme();

  const [form] = Form.useForm();
  const [image, setImage] = useState(post.imageUrl || "");
  const [bodyInvalid, setBodyInvalid] = useState(false);

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
      okText: "Update",
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

  const isFormValid = () => {
    const errors = form.getFieldsError();
    return !errors.some((error) => error.errors.length > 0) && !bodyInvalid;
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
        disabled: !isFormValid(),
        style: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      cancelButtonProps={{
        style: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      okText="Update"
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginTop: -10, marginBottom: 10 }}>
          What's on your mind?
        </div>

        {/* upload file */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="image-upload"
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
            id="image-upload"
            type="file"
            onChange={handleImageUpload}
            style={{
              display: "none",
            }}
          />

          {image && (
            <Button
              type="secondary"
              onClick={() => setImage("")}
              style={{
                width: 30,
                height: 25,
                padding: 0,
                marginTop: -20,
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
          )}
        </div>
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
              autoSize={{ minRows: 2, maxRows: 5 }}
              style={{
                width: "100%",
              }}
              onChange={(e) => {
                const value = e.target.value;
                setBodyInvalid(value.length < 1 || value.length > 255);
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
                <Image
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
        </Form>
      </div>
      <Divider
        style={{
          borderColor: darkMode ? "#3B3B3B" : "#F5F5F5",
          marginTop: 0,
          marginBottom: 15,
          height: 5,
        }}
      />
    </Modal>
  );
};

export default UpdatePost;
