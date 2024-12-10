import { Col, Form, Input, message, Row, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import PostService from '../service/PostService';
import ViewAllCommentsPerPost from './ViewAllCommentsPerPost';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;

const AddComment = ({ postDetails }) => {
  const [form] = Form.useForm();
  const params = useParams();
  const postId = +params.id;
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentAdded, setCommentAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    PostService.getCommnetsByPostId(postId)
      .then((response) => {
        setIsLoading(false);
        setComments(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await PostService.getCommnetsByPostId(postId);
        setIsLoading(false);
        setComments(fetchedComments.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        message.error("Error loading comments.");
      }
    };

    fetchComments();
  }, [commentAdded]);

  const deleteCommentById = async (id) => {
    try {
      await PostService.deleteCommentById(id);
      message.success("Comment deleted successfully");
      setCommentAdded((prev) => !prev);
    } catch (error) {
      console.error("Error deleting comment", error);
      message.error("Error deleting comment. Please try again.");
    }
  };

  const updateComment = async (id, cBody) => {
    try {
      await PostService.updateComment(id, cBody);
      message.success("Comment updated successfully");
      setCommentAdded((prev) => !prev);
    } catch (error) {
      console.error("Error updating comment", error);
      message.error("Error updating comment. Please try again.");
    }
  };

  const handleSubmit = async (values) => {
    console.log("Comment Values:", values);
    try {
      const requestData = {
        ...values,
        post: postDetails,
        user: currentUser,
      };
      console.log(requestData);

      await PostService.createComment(requestData);

      setCommentAdded((prev) => !prev);

      message.success("Comment successfully added!");
      form.resetFields();
    } catch (error) {
      console.error("Error during form submission:", error);
      message.error("Error adding comment. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 550,
        margin: "0 auto",
        padding: "10px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form
        form={form}
        name="add_comment"
        onFinish={handleSubmit}
        initialValues={{
          remember: true,
        }}
        layout="vertical"
      >
        <Row gutter={24}>
          <Col span={17}>
            <Form.Item
              label=""
              name="commentBody"
              rules={[
                { required: true, message: "Please input your comment!" },
              ]}
            >
              <TextArea
                placeholder="Add comment"
                style={{ padding: "5px", width: "100%" }}
                autoSize={{ minRows: 1, maxRows: 3 }}
              />
            </Form.Item>
          </Col>

          <Col span={7} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Comment
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <ViewAllCommentsPerPost
        comments={comments}
        onDeleteComment={deleteCommentById}
        onUpdateComment={updateComment}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AddComment;
