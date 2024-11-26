import { Col, Form, Input, Row } from 'antd';
import React from 'react'
import { useAuth } from "../context/AuthContext";
import { Button } from 'antd/es/radio';
const AddComment = ({postDetails}) => {
    const [form] = Form.useForm();
    const { currentUser } = useAuth();

  return (
    <div style={{ maxWidth: 550, margin: '0 auto', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
    <Form
        form={form}
        name="add_comment"
        //onFinish={showConfirm}
        initialValues={{
          remember: true
        }}
        layout="vertical"
      >
         <Row gutter={24}>
          <Col span={17}>
            <Form.Item
              label=""
              name="commentBody"
              rules={[{ required: true, message: 'Please input your comment!' }]}
            >
              <Input
                placeholder="Add comment"
                style={{ padding: '5px', width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col span={7} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item>
            <Button size="large">
                Add Comment
            </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>   
  )
}

export default AddComment