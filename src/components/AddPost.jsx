import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Typography, Space, Row, Col, Tooltip, Modal } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

const AddPost = () => {
  const [form] = Form.useForm(); // Initialize the form
  const [imageUrl, setImageUrl] = useState(null); // For storing image preview URL

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      const fileUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(fileUrl);
      form.setFieldsValue({ image: fileUrl }); 
    } else if (info.file.status === 'error') {
      message.error('Image upload failed.');
    }
  };

  const showConfirm = (values) => {
    Modal.confirm({
      title: 'Are you sure you want to add a post?',
      content: 'Once posted, your post will be visible to others.',
      onOk: () => handleSubmit(values),  // Submit form if confirmed
      onCancel: () => {
        message.info('Post canceled');
      },
    });
  };

  const handleSubmit = (values) => {
    console.log('Post Values:', values);
    message.success('Post added successfully!');
    form.resetFields();
    setImageUrl(null);  
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
      <Form
        form={form}
        name="add_post"
        onFinish={showConfirm}
        initialValues={{ body: '', image: '' }} 
        layout="vertical"
      >
        <Row gutter={24}>
          <Col span={21}>
            <Form.Item
              label="What's on your mind?"
              name="body"
              rules={[{ required: true, message: 'Please input your post!' }]}
            >
              <Input
                placeholder="What's on your mind?"
                style={{ borderRadius: '8px', padding: '10px', width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item name="image" label=" " style={{ marginBottom: 0 }}>
              <Tooltip title="Upload an image">
                <Upload
                  name="image"
                  listType="picture"
                  accept="image/*"
                  showUploadList={false}
                  onChange={handleImageChange}
                  beforeUpload={() => false}  // Prevent auto-upload to a server
                >
                  <Button size="large" icon={<PictureOutlined />} />
                </Upload>
              </Tooltip>
            </Form.Item>
          </Col>
        </Row>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block style={{ borderRadius: '8px' }}>
            Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPost;
