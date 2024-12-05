import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Dropdown,
  Switch,
  Space,
  Row,
  Col,
  Modal,
} from "antd";
import {
  SettingOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import UserModal from "../components/UserModal";
import { useTheme } from "../context/ThemeContext";

const { Header } = Layout;

const Navbar = () => {
  const Navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  const [updateUser, setUpdateUser] = useState(false);

  const showConfirmLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to exit this page?",
      onOk: () => handleLogout(),
    });
  };
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    console.log("Logging out...");
  };

  const settingsMenu = (
    <Menu>
      <Menu.Item key="1">
        <Space>
          <span>Dark Mode</span>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Space>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<UserOutlined />}
        onClick={() => setUpdateUser(true)}
      >
        Update User
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<PoweroffOutlined />}
        onClick={showConfirmLogout}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout>
        <Header style={{ padding: 0, background: "#001529" }}>
          <Row align="middle" justify="space-between" style={{ width: "100%" }}>
            <Col xs={12} sm={8} md={6}>
              <Typography.Title
                level={3}
                style={{ color: "white", margin: 0, marginLeft: 20 }}
              >
                Social Media App
              </Typography.Title>
            </Col>

            <Col xs={12} sm={16} md={12} style={{ textAlign: "right" }}>
              <Menu
                theme="dark"
                mode="horizontal"
                style={{
                  margin: 0,
                  display: "inline-block",
                  fontSize: "16px",
                  width: "auto",
                }}
              >
                <Menu.Item key="1" onClick={() => Navigate("/home")}>
                  Home
                </Menu.Item>
                <Menu.Item key="2" onClick={() => Navigate("/profile")}>
                  Profile
                </Menu.Item>

                <Menu.Item
                  key="3"
                  icon={<SettingOutlined />}
                  style={{ marginLeft: "10px" }}
                >
                  <Dropdown overlay={settingsMenu} trigger={["click"]}>
                    <span>Settings</span>
                  </Dropdown>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
      </Layout>

      <UserModal
        isModalOpen={updateUser}
        onClose={() => setUpdateUser(false)}
      />
    </>
  );
};

export default Navbar;
