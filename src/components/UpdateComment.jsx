import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React, { useEffect, useState } from "react";
import "../styles/Modal.css";

const UpdateComment = ({ comment, onUpdate, onClose }) => {
  const [form] = Form.useForm();
  console.log(comment);

  const [commentBodyInvalid, setCommentBodyInvalid] = useState(false);

  useEffect(() => {
    if (comment) {
      form.setFieldsValue({
        commentBody: comment.commentBody,
      });
    }
  }, [comment, form]);

  const isFormValid = () => {
    const errors = form.getFieldsError();
    return (
      !errors.some((error) => error.errors.length > 0) && !commentBodyInvalid
    );
  };

  const handleSubmit = (values) => {
    // Show a confirmation modal before submitting the update
    Modal.confirm({
      title: "Update Comment",
      content: "Are you sure you want to update this comment?",
      okText: "Update",
      okType: "primary",
      cancelText: "Cancel",
      onOk: () => {
        const updatedCommentBody = values.commentBody;
        const commentId = comment.id;
        onUpdate(commentId, updatedCommentBody);
        onClose();
      },
    });
  };

  return (
    <>
      <Form
        form={form}
        name="updateComment"
        onFinish={handleSubmit}
        initialValues={{
          commentBody: comment.commentBody,
        }}
        layout="vertical"
      >
        <Row gutter={24}>
          <Col span={19}>
            <Form.Item
              label=""
              name="commentBody"
              rules={[
                { required: true, message: "Please input your comment!" },
              ]}
            >
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  setCommentBodyInvalid(value.length < 1 || value.length > 255);
                }}
                style={{ padding: "5px", width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={5} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isFormValid()}
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UpdateComment