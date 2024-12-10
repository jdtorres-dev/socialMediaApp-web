import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import "../styles/LoginPage.css";

const LoginPage = () => {
  const { login } = useAuth();
  const { darkMode } = useTheme();

  const onFinish = async (values) => {
    const { username, password } = values;

    const loginField = {
      username: username,
      password: password,
    };

    await login(loginField);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  return (
    <>
      <div className="container-login">
        <div className="main-login">
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: -25,
                marginLeft: -25,
                gap: 15,
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
                  Login
                </h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
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
                  No account?{" "}
                </div>
                <div style={{ fontSize: 12 }}>
                  <Link
                    to="/signup"
                    style={{
                      color: darkMode ? "lightgray" : "violet",
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ marginTop: -10 }}
          >
            <label style={{ color: "darkgray", fontSize: 11, marginTop: -100 }}>
              Username or Email
            </label>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username or email.",
                },
              ]}
            >
              <Input
                className="login-input"
                prefix={<UserOutlined style={{ fontSize: 13 }} />}
                placeholder="Username or Email"
              />
            </Form.Item>

            <label
              style={{ marginTop: "-12px", color: "darkgray", fontSize: 11 }}
            >
              Password
            </label>
            <Form.Item
              className="password-input"
              name="password"
              rules={[
                { required: true, message: "Please input your password." },
              ]}
            >
              <Input.Password
                className="login-input"
                prefix={<LockOutlined style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginTop: 5 }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
