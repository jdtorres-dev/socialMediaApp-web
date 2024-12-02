import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React, { useEffect } from 'react'

const UpdateComment = ({comment, onUpdate, onClose}) => {
    const [form] = Form.useForm();
    console.log(comment)

    useEffect(() => {
        if (comment) {
            form.setFieldsValue({
                commentBody: comment.commentBody
            });
        }
    }, [comment, form]);

    const handleSubmit = (values) => {
        // Show a confirmation modal before submitting the update
        Modal.confirm({
            title: 'Are you sure you want to update this comment?',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'Cancel',
            onOk: () => {
                const updatedCommentBody = values.commentBody;
                const commentId = comment.id;
                onUpdate(commentId, updatedCommentBody);  // Call onUpdate with the updated comment
                onClose(); // Close the modal
            },
            onCancel: () => {
                // Optionally handle cancel action (do nothing or display a message)
            }
        });
    };

    return (
        
          <Form
            form={form}
            name="updateComment"
            onFinish={handleSubmit}
            initialValues={{
                commentBody: comment.commentBody
            }}
            layout="vertical"
          >
            <Row gutter={24}>
              <Col span={19}>
                <Form.Item
                  label=""
                  name="commentBody"
                  rules={[{ required: true, message: 'Please input your comment!' }]}
                >
                  <Input
                    style={{ padding: '5px', width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
      );
}

export default UpdateComment