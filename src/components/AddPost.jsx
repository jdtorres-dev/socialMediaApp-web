import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Row, Col, Tooltip, Modal } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import PostService from '../service/PostService';
import { useAuth } from "../context/AuthContext";
const AddPost = () => {
  const [form] = Form.useForm(); 
  const [imageUrl, setImageUrl] = useState(null); 

 const { currentUser } = useAuth();
  console.log('id',currentUser.id)


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
      onOk: () => handleSubmit(values),
      onCancel: () => {
        message.info('Post canceled');
      },
    });
  };

  const handleSubmit = async (values) => {
    console.log("Final image URL:", imageUrl);
    console.log('Post Values:', values);
    try{

      const requestData = {
        ...values,
        imageUrl: "sample",
        user: currentUser
      };
      console.log(requestData);
      console.log("user",currentUser)

      await PostService.createPost(requestData);
      message.success(
        "Post successfully uploaded!"
      );
      form.resetFields();
      setImageUrl(null);  

    } catch (error) {

      console.error("Error during form submission:", error);
      message.error("Error uploading post. Please try again.");

    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '15px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
      <Form
        form={form}
        name="add_post"
        onFinish={showConfirm}
        initialValues={{
          remember: true
        }}
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
