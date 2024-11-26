import { Avatar, Button, Card, Image, Typography } from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import Title from 'antd/es/skeleton/Title';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const PostCards = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '15px' }}>
      {/* Display each post in a Card */}
      {posts.map((post) => (
        <Card
          key={post.id}
          style={{
            marginBottom: '20px',
            border: '1px solid #333',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
          title={<Typography level={4}>Post by @{post.user ? post.user.username : 'Unknown'}</Typography>}
          extra={<Avatar>{post.user ? post.user.username.charAt(0).toUpperCase() : '?'}</Avatar>}
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
                marginTop: '15px'
              }}
              preview={true}
            />
          )}

          {/* View Post Button */}
          <Button
            type="secondary"
            style={{ marginTop: '10px' }}
            block
            onClick={() => navigate(`/post/${post.id}`)} 
          >
            View Post
          </Button>
        </Card>
      ))}
    </div>
  );
}


export default PostCards