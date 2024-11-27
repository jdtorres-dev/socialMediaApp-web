import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Row, Col, Tooltip, Modal } from 'antd';
import PostService from '../service/PostService';
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import PostCards from './PostCards';

const AddPost = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");

  const { currentUser } = useAuth();
  const { darkMode } = useTheme();
  const [posts, setPosts] = useState([]);
  const [postAdded, setPostAdded] = useState(false);

  useEffect(() => {
    PostService.getAllpost()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await PostService.getAllpost();  
        setPosts(fetchedPosts.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        message.error("Error loading posts.");
      }
    };

    fetchPosts(); 

  }, [postAdded]);

  /*const beforeUpload = (file) => {
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
 };*/

  // Handle the file change event in the Upload component
  /*const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      const fileUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(fileUrl); // Set the image URL after upload
        } else if (info.file.status === 'error') {
      message.error('Image upload failed.');
    }
  };*/

  /*useEffect(() => {
    console.log('Updated imageUrl:', imageUrl); // This will log the imageUrl after it's been updated
  }, [imageUrl]);*/

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
        setImageUrl(data.result);
      });
      data.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log("Final image URL:", imageUrl);
  }, [imageUrl]);

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
    try {

      const requestData = {
        ...values,
        imageUrl: imageUrl,
        user: currentUser
      };
      console.log(requestData);

      await PostService.createPost(requestData);

      setPostAdded((prev) => !prev);
      

      message.success(
        "Post successfully uploaded!"
      );
      setImageUrl("");
      form.resetFields();
      

    } catch (error) {

      console.error("Error during form submission:", error);
      message.error("Error uploading post. Please try again.");

    }
  };

  return (
    <>
    <div style={{ maxWidth: 550, margin: '0 auto', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
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
          <Col span={19}>
             <label style={{color: darkMode ? "White" : "Black"}}>
              What's on your mind?
            </label>
            <Form.Item
              name="body"
              rules={[{ required: true, message: 'Please input your post!' }]}
            >
              <Input
                placeholder="What's on your mind?"
                style={{ borderRadius: '8px', padding: '10px', width: '100%'}}
              />
            </Form.Item>
          </Col>

          <Col span={5} style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30 }}>
            {/*<Tooltip title="Upload an image"> 
                <Upload
                  name="image"
                  listType="picture"
                  accept="image/*"
                  showUploadList={false}
                  onChange={handleImageChange}
                  beforeUpload={beforeUpload}  // Prevent auto-upload to a server
                >
                  <Button size="large" icon={<PictureOutlined />} />
                </Upload>
              </Tooltip>*/}
            <Tooltip title="Upload an image"> 
              <input
                name='image'
                accept='image/*'
                type="file"
                onChange={handleImageUpload}
                style={{
                  whiteSpace: "wrap",
                  marginBottom: 10,
                  width: "100%",
                  color: "gray",
                  fontWeight: 400,
                }}
              />
            </Tooltip>
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
    <PostCards posts={posts}/>
    </>
  );
};

export default AddPost;
