import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal, Spin, Divider } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { BsFillExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import UserService from "../service/UserService";
import { useGetUserById } from "../queries/UserQueries";

const UserModal = ({ isModalOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { data } = useGetUserById(currentUser.id);

  const [form] = Form.useForm();
  const [image, setImage] = useState("");

  const [usernameIsLoading, setUsernameIsLoading] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  const [emailIsLoading, setEmailIsLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: data.name,
        username: data.username,
        email: data.email,
        imageUrl: data.imageUrl,
      });
    }
  }, [isModalOpen, form, data]);

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
  }, [image, data]);

  const checkUsername = async (value) => {
    if (value === data.username) {
      setUsernameExists(false);
      setUsernameValid(true);
      return;
    }

    if (!value || value.length < 3) {
      setUsernameExists(false);
      setUsernameValid(false);
      return;
    }

    setUsernameIsLoading(true);

    try {
      const response = await UserService.checkUsername(value);
      if (response.status === 200) {
        form.setFields([
          {
            name: "username",
            errors: ["Username is already taken."],
          },
        ]);
        setUsernameExists(true);
        setUsernameValid(false);
      } else {
        form.setFields([
          {
            name: "username",
            errors: [],
          },
        ]);
        setUsernameExists(false);
        setUsernameValid(true);
      }
      setUsernameIsLoading(false);
    } catch (error) {
      setUsernameIsLoading(false);
      setUsernameExists(false);
      setUsernameValid(true);
      console.error("Error checking username:", error);
    }
  };

  const checkEmail = async (value) => {
    if (value === data.email) {
      setEmailExists(false);
      setEmailValid(true);
      return;
    }

    if (!value || value.length < 5) {
      setEmailExists(false);
      setEmailValid(false);
      return;
    }

    setEmailIsLoading(true);

    try {
      const response = await UserService.checkEmail(value);

      if (response.status === 200) {
        form.setFields([
          {
            name: "email",
            errors: ["Email is already registered."],
          },
        ]);
        setEmailExists(true);
        setEmailValid(false);
      } else {
        form.setFields([
          {
            name: "email",
            errors: [],
          },
        ]);
        setEmailExists(false);
        setEmailValid(true);
      }

      setEmailIsLoading(false);
    } catch (error) {
      setEmailIsLoading(false);
      setEmailExists(false);
      setEmailValid(true);
      console.error("Error checking email:", error);
    }
  };

  const showConfirmUpdate = () => {
    Modal.confirm({
      title: "Update Profile",
      content: "Are you sure you want to update your profile?",
      onOk: async () => {
        try {
          const formValues = form.getFieldsValue();
          const updatedUser = {
            name: formValues.name,
            username: formValues.username,
            email: formValues.email,
            imageUrl: image
              ? image
              : formValues.imageUrl
              ? formValues.imageUrl
              : "https://www.svgrepo.com/show/524211/user.svg",
          };

          if (formValues.password) {
            updatedUser.password = formValues.password;
          } else {
            updatedUser.password = undefined;
          }

          await UserService.updateUser(localStorage.getItem("id"), updatedUser);

          onClose();
          message.success("Successfully updated user information.");
          queryClient.invalidateQueries({ queryKey: ["getUserById"] });
        } catch (error) {
          console.error("Error", error);
          onClose();
          message.error(
            "An error occurred while updating user. Please try again later."
          );
        }
      },
      onCancel: () => onClose(),
    });
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={onClose}
      onOk={showConfirmUpdate}
      closable={false}
      width={350}
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
      <h3
        style={{
          textAlign: "start",
          marginTop: -5,
        }}
      >
        Update User Profile
      </h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: 20,
          marginTop: -10,
        }}
      >
        <div style={{ marginTop: -10 }}>
          {image ? (
            <img
              src={image}
              alt="avatar"
              style={{ height: 90, width: 90, borderRadius: "50%" }}
            />
          ) : data?.imageUrl && !image ? (
            <img
              src={data.imageUrl}
              alt="avatar"
              style={{ height: 90, width: 90, borderRadius: "50%" }}
            />
          ) : (
            <img
              src="https://www.svgrepo.com/show/524211/user.svg"
              alt="placeholder"
              style={{ height: 90, width: 90, borderRadius: "50%" }}
            />
          )}
        </div>

        <div>
          <Form
            form={form}
            name="update_user_form"
            onFinish={showConfirmUpdate}
            onFinishFailed={(errorInfo) => {
              console.log("Form submission failed:", errorInfo);
            }}
          >
            <label
              style={{ marginTop: "-12px", color: "darkgray", fontSize: 11 }}
            >
              Name
            </label>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your name." },
                {
                  min: 3,
                  message: "Name must be at least 3 characters long.",
                },
                {
                  pattern: /^[A-Za-z\s]+$/,
                  message: "Name must only contain letters.",
                },
              ]}
            >
              <Input
                className="signup-input"
                prefix={<UserOutlined style={{ fontSize: 13 }} />}
                placeholder="Enter Your Name"
              />
            </Form.Item>

            <label
              style={{ marginTop: "-12px", color: "darkgray", fontSize: 11 }}
            >
              Username
            </label>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input a username." },
                {
                  min: 3,
                  message: "Username must be at least 3 characters long.",
                },
              ]}
            >
              <Input
                className="signup-input"
                prefix={<UserOutlined style={{ fontSize: 13 }} />}
                suffix={
                  usernameIsLoading ? (
                    <Spin />
                  ) : usernameExists ? (
                    <BsFillExclamationCircleFill style={{ color: "red" }} />
                  ) : usernameValid ? (
                    <BsCheckCircleFill style={{ color: "green" }} />
                  ) : null
                }
                placeholder="Enter Your Username"
                onBlur={(e) => checkUsername(e.target.value)}
              />
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* upload file */}
      <div style={{ marginTop: -28 }}>
        <input
          type="file"
          onChange={handleImageUpload}
          style={{
            whiteSpace: "wrap",
            marginBottom: 10,
            width: "100%",
            color: "#fff",
          }}
        />
      </div>

      <div>
        <Form
          form={form}
          name="update_user_form"
          onFinish={showConfirmUpdate}
          onFinishFailed={(errorInfo) => {
            console.log("Form submission failed:", errorInfo);
          }}
        >
          <label
            style={{ marginTop: "-12px", color: "darkgray", fontSize: 11 }}
          >
            Email
          </label>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input an email." },
              { type: "email", message: "Please enter a valid email." },
            ]}
          >
            <Input
              className="signup-input"
              prefix={<MailOutlined style={{ fontSize: 13 }} />}
              suffix={
                emailIsLoading ? (
                  <Spin />
                ) : emailExists ? (
                  <BsFillExclamationCircleFill style={{ color: "red" }} />
                ) : emailValid ? (
                  <BsCheckCircleFill style={{ color: "green" }} />
                ) : null
              }
              placeholder="Enter Your Email"
              onBlur={(e) => checkEmail(e.target.value)}
            />
          </Form.Item>

          <label
            style={{ marginTop: "-12px", color: "darkgray", fontSize: 11 }}
          >
            Password
          </label>
          <Form.Item name="password">
            <Input.Password
              className="signup-input"
              prefix={<LockOutlined style={{ fontSize: 13 }} />}
              type="password"
              placeholder="Enter Your Password"
            />
          </Form.Item>
        </Form>
      </div>
      <Divider style={{ color: "black", marginTop: 0, marginBottom: 15 }} />
    </Modal>
  );
};

export default UserModal;
