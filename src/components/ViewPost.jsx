import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../service/PostService';
import { Avatar, Card, Image, Typography, Spin } from 'antd';
import AddComment from './AddComment';

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const params = useParams();
  const postId = +params.id;

  useEffect(() => {
    PostService.getPostById(postId).then((response) => {
      setPost(response.data);
    }).catch(error => {
      console.error('Error fetching post:', error);
    });
  }, [postId]);

  if (post === null) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin size="large" />
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '15px' }}>
      <Card
        key={post.id}
        style={{
          marginBottom: '20px',
          //border: '1px solid #333',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        title={
          <Typography level={4}>
            Post by @{post.user ? post.user.username : 'Unknown'}
          </Typography>
        }
        extra={
          <Avatar>
            {post.user ? post.user.username.charAt(0).toUpperCase() : '?'}
          </Avatar>
        }
      >
        {/* Post Created Date */}
        <Typography type="secondary" style={{ fontSize: '0.6rem', textAlign: 'right' }}>
          {post.createdDate ? new Date(post.createdDate).toLocaleString() : 'No date available'}
        </Typography>

        {/* Post Body */}
        <Typography>{post.body}</Typography>

        {/* Post Image */}
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Post image"
            style={{
              width: 450,
              height: 350,
              objectFit: 'cover',
              marginBottom: '15px',
              marginTop: '15px',
            }}
            preview={true}
          />
        )}
      </Card>
      <AddComment postDetails={post}></AddComment>
    </div>
  );
};

export default ViewPost;
