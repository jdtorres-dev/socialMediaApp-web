import React, { useEffect, useState } from "react";
import {
  Avatar,
  Form,
  Input,
  message,
  Modal,
  Spin,
  Divider,
  Button,
} from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { BsFillExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import UserService from "../service/UserService";
import { useGetUserById } from "../queries/UserQueries";
import { useTheme } from "../context/ThemeContext";

import { CiImageOn } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

import "../styles/Modal.css";

const UserModal = ({ isModalOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { darkMode } = useTheme();
  const { data } = useGetUserById(currentUser.id);

  const [form] = Form.useForm();
  const [image, setImage] = useState("");

  const [usernameIsLoading, setUsernameIsLoading] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  const [emailIsLoading, setEmailIsLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [nameInvalid, setNameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const [originalPassword, setOriginalPassword] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: data?.name,
        username: data?.username,
        email: data?.email,
        imageUrl: data?.imageUrl,
        interest: data?.interest,
        bio: data?.bio
      });
      setImage(data?.imageUrl);
      setOriginalPassword(data?.password);
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

  useEffect(() => {}, [image, data]);

  const checkUsername = async (value) => {
    if (value === data.username) {
      setUsernameExists(false);
      setUsernameValid(true);
      return;
    }

    if (!value || value.length < 5 || value.length > 50) {
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

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
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
      content: "Are you sure you want to update your information?",
      onOk: async () => {
        try {
          const formValues = form.getFieldsValue();
          const updatedUser = {
            name: formValues.name,
            username: formValues.username,
            email: formValues.email,
            imageUrl: image ? image : formValues.imageUrl,
            bio: formValues.bio,
            interest: formValues.interest
          };

          if (
            formValues.password &&
            formValues.password !== originalPassword &&
            formValues.password !== "" &&
            formValues.password !== " " &&
            formValues.password !== null
          ) {
            updatedUser.password = formValues.password;
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

  const isFormValid = () => {
    const errors = form.getFieldsError();
    return (
      !errors.some((error) => error.errors.length > 0) &&
      !emailExists &&
      !usernameExists &&
      !nameInvalid &&
      !passwordInvalid
    );
  };

  return (
    <Modal
      className={darkMode ? "ant-modal-dark" : ""}
      open={isModalOpen}
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
      <h2
        style={{
          textAlign: "start",
          marginTop: -5,
        }}
      >
        Update User Profile
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            marginTop: -5,
          }}
        >
          <div
            className="image-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 0,
            }}
          >
            <div>
              {image ? (
                <Avatar
                  src={image}
                  style={{ height: 90, width: 90, border: "50%" }}
                />
              ) : (
                <Avatar style={{ height: 90, width: 90, fontSize: 65 }}>
                  {data?.username
                    ? data.username.charAt(0).toUpperCase()
                    : null}
                </Avatar>
              )}
            </div>

            {/* upload file */}
            <div
              style={{
                position: "relative",
                width: "100%",
                marginTop: 5,
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
                <label
                  htmlFor="modal-upload"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    width: 40,
                    height: 25,
                    backgroundColor: "#1677ff",
                    borderRadius: "15px",
                    color: "#fff",
                  }}
                >
                  <CiImageOn style={{ fontSize: "25px" }} />
                </label>
                <input
                  id="modal-upload"
                  type="file"
                  onChange={handleImageUpload}
                  style={{
                    display: "none",
                  }}
                />
                <Button
                  onClick={() => setImage("")}
                  style={{
                    width: 40,
                    height: 25,
                    border: "1px solid red",
                    borderRadius: 15,
                  }}
                  icon={<GoTrash style={{ fontSize: 18, color: "red" }} />}
                />
              </div>
            </div>
          </div>

          <div>
            <Form
              form={form}
              name="update_user_form"
              onFinish={showConfirmUpdate}
              onFinishFailed={(errorInfo) => {
                console.log("Form submission failed:", errorInfo);
              }}
              onValuesChange={() => form.validateFields()}
            >
              {/*Name*/}
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
                    message: "Name must be at least 3 characters.",
                  },
                  {
                    max: 50,
                    message: "Name must be less than 50 characters long.",
                  },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message:
                      "Name must only contain letters and spaces, no numbers allowed.",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ fontSize: 13 }} />}
                  placeholder="Enter Your Name"
                  onChange={(e) => {
                    const value = e.target.value;
                    setNameInvalid(
                      value.length < 3 ||
                        value.length > 50 ||
                        /[0-9]/.test(value)
                    );
                  }}
                />
              </Form.Item>

              {/*Email*/}
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

              {/*Interest*/}
              <label
                style={{ marginTop: "-12px", color: "darkgray", fontSize: 11 }}
              >
                Interest
              </label>
              <Form.Item
                name="interest"
                rules={[
                  { required: false, message: "Please input your name." },
                  {
                    min: 3,
                    message: "Interest must be at least 3 characters.",
                  },
                  {
                    max: 200,
                    message: "Interest must be less than 200 characters long.",
                  },
                  // {
                  //   pattern: /^[A-Za-z0-9._-]+$/,
                  //   message:
                  //     "Username can only contain letters, numbers, and special characters (-, _, .).",
                  // },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ fontSize: 13}} />}
                  placeholder="Enter Your Interest"
                  onChange={(e) => {
                    const value = e.target.value;
                    setNameInvalid(
                      value.length < 3 ||
                        value.length > 200 ||
                        /[0-9]/.test(value)
                    );
                  }}
                  style={{ height: '140px', fontSize: '14px', padding: '10px' }} // Adjust height here
                />
              </Form.Item>

            </Form>
          </div>

          <div>
            <Form
              form={form}
              name="update_user_form"
              onFinish={showConfirmUpdate}
              onFinishFailed={(errorInfo) => {
                console.log("Form submission failed:", errorInfo);
              }}
              onValuesChange={() => form.validateFields()}
            >
              {/*Username*/}
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
                    min: 5,
                    message: "Username must be at least 5 characters.",
                  },
                  {
                    max: 50,
                    message: "Username must be less than 50 characters.",
                  },
                  // {
                  //   pattern: /^[A-Za-z0-9._-]+$/,
                  //   message:
                  //     "Username can only contain letters, numbers, and special characters (-, _, .).",
                  // },
                ]}
              >
                <Input
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

              {/*New Password*/}
              <label
                style={{ marginTop: "-12px", color: "darkgray", fontSize: 11 }}
              >
                Password
              </label>
              <Form.Item
                name="password"
                rules={[
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                    message:
                      "Password must be at least 8 characters long and contain uppercase, lowercase, a number, and a special character.",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ fontSize: 13 }} />}
                  type="password"
                  autoComplete="off"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "") {
                      setPasswordInvalid(false);
                      form.setFieldsValue({
                        password: "",
                      });
                    } else {
                      setPasswordInvalid(
                        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
                          value
                        )
                      );
                    }
                  }}
                />
              </Form.Item>

              {/*Bio*/}
              <label
                style={{ marginTop: "-12px", color: "darkgray", fontSize: 11 }}
              >
                Bio
              </label>
              <Form.Item
                name="bio"
                rules={[
                  { required: false, message: "Please input your name." },
                  {
                    min: 3,
                    message: "Bio must be at least 3 characters.",
                  },
                  {
                    max: 200,
                    message: "Bio must be less than 200 characters long.",
                  },
                  // {
                  //   pattern: /^[A-Za-z0-9._-]+$/,
                  //   message:
                  //     "Username can only contain letters, numbers, and special characters (-, _, .).",
                  // },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ fontSize: 13 }} />}
                  placeholder="Enter Your Bio"
                  onChange={(e) => {
                    const value = e.target.value;
                    setNameInvalid(
                      value.length < 3 ||
                        value.length > 200 ||
                        /[0-9]/.test(value)
                    );
                  }}
                />
              </Form.Item>
              
            </Form>
          </div>
        </div>
      </div>
      <Divider
        style={{
          borderColor: darkMode ? "#3B3B3B" : "#F5F5F5",
          marginTop: 10,
          marginBottom: 10,
          height: 5,
        }}
      />
    </Modal>
  );
};

export default UserModal;
