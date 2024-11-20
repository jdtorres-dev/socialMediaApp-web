import { UserOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal } from "antd";
import { useEffect } from "react";
import UserService from "../service/UserService";
import "../styles/LoginPage.css";
import { useAuth } from "../context/AuthContext";

const UserModal = ({ isModalOpen, onClose }) => {
  const { currentUser } = useAuth();

  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: localStorage.getItem("name"),
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
      });
    }
  }, [isModalOpen, form]);

  const handleOk = async () => {
    try {
      const formValues = form.getFieldsValue();
      const updatedUser = {
        name: formValues.name,
        username: formValues.username,
        email: formValues.email,
        imageUrl: formValues.imageUrl,
        password: formValues.password,
      };

      await UserService.updateUser(localStorage.getItem("id"), updatedUser);

      onClose();
      message.success("Successfully updated user information.");
    } catch (error) {
      console.error("Error", error);
      onClose();
      message.error(
        "An error occurred while updating user. Please try again later."
      );
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      closable={false}
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
      <div>
        <h3 style={{ textAlign: "start" }}>Update User</h3>
        <Form
          form={form}
          name="update_user_form"
          onFinish={handleOk}
          onFinishFailed={(errorInfo) => {
            console.log("Form submission failed:", errorInfo);
          }}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your name." },
              { min: 3, message: "Name must be at least 3 characters long." },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ fontSize: 13 }} />}
              style={{ backgroundColor: "#F5F5F5" }}
              value={currentUser.name}
            />
          </Form.Item>

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
              prefix={<UserOutlined style={{ fontSize: 13 }} />}
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </Form.Item>

          <Form.Item
            name="email"
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
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </Form.Item>

          <Form.Item name="password">
            <Input
              prefix={<UserOutlined style={{ fontSize: 13 }} />}
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </Form.Item>

          <Form.Item name="imageUrl">
            <Input
              prefix={<UserOutlined style={{ fontSize: 13 }} />}
              style={{ backgroundColor: "#F5F5F5" }}
            />
          </Form.Item>
        </Form>
        <hr />
      </div>
    </Modal>
  );
};

export default UserModal;
