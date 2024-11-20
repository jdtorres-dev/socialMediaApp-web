import React from 'react'
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { MdWavingHand } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

import "../styles/LoginPage.css";

const LoginPage = () => {
  const { login } = useAuth();

  const onFinish = async (values) => {
    await login(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  return (
    <>
      <div className="container-login">
        <div className="main-login">
          <h3 style={{ textAlign: "center" }}>
            Hi, Welcome Back!{" "}
            <MdWavingHand style={{ paddingLeft: "10px", color: "#E6BF00" }} />
          </h3>
          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <label style={{ color: "darkgray", fontSize: 11, marginTop: -100 }}>
              Username
            </label>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username." },
                {
                  min: 3,
                  message: "Username must be at least 3 characters long.",
                },
              ]}
            >
              <Input
                className="login-input"
                prefix={<UserOutlined style={{ fontSize: 13 }} />}
                placeholder="Username"
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
                style={{ marginTop: 3 }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div style={{ marginTop: -12 }}>
            <h6 style={{ textAlign: "center" }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;