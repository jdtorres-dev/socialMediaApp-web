import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Spin, Image } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { BsFillExclamationCircleFill, BsCheckCircleFill } from "react-icons/bs";
import UserService from "../service/UserService";
import { useTheme } from "../context/ThemeContext";
import { CiImageOn } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

import "../styles/SignupPage.css";

const SignupPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [image, setImage] = useState("");

  const [usernameIsLoading, setUsernameIsLoading] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  const [emailIsLoading, setEmailIsLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

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
  }, [image]);

  const checkUsername = async (value) => {
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

  const onFinish = async (values) => {
    console.log("Final image URL:", image);
    try {
      const requestData = {
        ...values,
        imageUrl:
          image || "https://www.svgrepo.com/show/221028/user-avatar.svg",
      };
      console.log(requestData);

      await UserService.createUser(requestData);

      message.success(
        "User created successfully! You may now login using your username and password."
      );
      navigate("/login");
    } catch (error) {
      console.error("Error during form submission:", error);
      message.error("Error creating user. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form submission failed:", errorInfo);
  };

  return (
    <>
      <div className="container-signup">
        <div
          className="main-signup"
          style={{
            backgroundColor: darkMode ? "#333" : "#fff",
          }}
        >
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
                justifyContent: "space-between",
                marginTop: -25,
                gap: 200,
              }}
            >
              <div>
                <h2
                  className="title"
                  style={{
                    color: darkMode ? "white" : "black",
                    padding: 0,
                    fontSize: 30,
                  }}
                >
                  Sign Up
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  marginRight: 25,
                  height: 60,
                }}
              >
                <div
                  style={{
                    textAlign: "end",
                    color: darkMode ? "lightgray" : "gray",
                    fontSize: 11,
                  }}
                >
                  Have an account?{" "}
                </div>
                <div style={{ fontSize: 12 }}>
                  <Link
                    to="/login"
                    style={{
                      color: darkMode ? "lightgray" : "violet",
                    }}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="second-row"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 40,
                marginTop: -8,
              }}
            >
              <div
                className="image-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div>
                  {image ? (
                    <Image
                      src={image}
                      alt="avatar"
                      style={{ height: 150, width: 150, borderRadius: "10%" }}
                    />
                  ) : (
                    <Image
                      src="https://www.svgrepo.com/show/221028/user-avatar.svg"
                      alt="placeholder"
                      style={{
                        height: 150,
                        width: 150,
                        borderRadius: "10%",
                      }}
                    />
                  )}
                </div>
                {/* upload file */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    marginTop: 20,
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
                    <input
                      id="user-upload"
                      type="file"
                      onChange={handleImageUpload}
                      style={{
                        display: "none",
                      }}
                    />
                    <Button
                      onClick={() =>
                        setImage(
                          "https://www.svgrepo.com/show/221028/user-avatar.svg"
                        )
                      }
                      style={{
                        width: 50,
                        height: 25,
                        border: "1px solid gray",
                        borderRadius: 15,
                        color: darkMode ? "#fff" : "gray",
                      }}
                      icon={
                        <GoTrash style={{ fontSize: 18, color: "black" }} />
                      }
                    />
                    <label
                      htmlFor="user-upload"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        width: 50,
                        height: 25,
                        backgroundColor: "#1677ff",
                        borderRadius: "15px",
                        color: "#fff",
                      }}
                    >
                      <CiImageOn style={{ fontSize: "25px" }} />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <Form
                  name="signup"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  form={form}
                >
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
                      {
                        pattern: /^[A-Za-z0-9._-]+$/,
                        message:
                          "Username can only contain letters, numbers, and special characters (-, _, .).",
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
                          <BsFillExclamationCircleFill
                            style={{ color: "red" }}
                          />
                        ) : usernameValid ? (
                          <BsCheckCircleFill style={{ color: "green" }} />
                        ) : null
                      }
                      placeholder="Enter Your Username"
                      onBlur={(e) => checkUsername(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input an email." },
                      { type: "email", message: "Please input a valid email." },
                    ]}
                  >
                    <Input
                      className="signup-input"
                      prefix={<MailOutlined style={{ fontSize: 13 }} />}
                      suffix={
                        emailIsLoading ? (
                          <Spin />
                        ) : emailExists ? (
                          <BsFillExclamationCircleFill
                            style={{ color: "red" }}
                          />
                        ) : emailValid ? (
                          <BsCheckCircleFill style={{ color: "green" }} />
                        ) : null
                      }
                      placeholder="Enter Your Email"
                      onBlur={(e) => checkEmail(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password.",
                      },
                      {
                        min: 8,
                        message: "Password must be at least 8 characters.",
                      },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                        message: "See password requirements.",
                      },
                    ]}
                  >
                    <Input.Password
                      className="signup-input"
                      prefix={<LockOutlined style={{ fontSize: 13 }} />}
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </Form.Item>

                  <div
                    className="password-requirements"
                    style={{
                      color: darkMode ? "lightgray" : "gray",
                    }}
                  >
                    <p style={{ fontSize: "10px" }}>Password requirements:</p>
                    <ul style={{ marginTop: -10 }}>
                      <li>At least 8 characters long</li>
                      <li>At least one special character</li>
                      <li>Both uppercase and lowercase letters</li>
                      <li>At least one number</li>
                    </ul>
                  </div>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="signup-form-button"
                      style={{ marginTop: 3 }}
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
