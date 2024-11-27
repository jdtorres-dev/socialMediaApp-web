import { Avatar, Button, Card, Image, Typography } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext";


const PostCards = ({ posts }) => {
  const { darkMode } = useTheme();

  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '15px' }}>
      {/* Display each post in a Card */}
      {posts.map((post) => (
        <Card
          key={post.id}
          style={{
            marginBottom: '20px',
            border: '1px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: darkMode ? "#3b3b3b" : "White"
          }}
          title={<Typography
            level={4}
            style={{
              color: darkMode ? "white" : "black"
            }}
          >Post by @{post.user ? post.user.username : 'Unknown'}</Typography>}
          extra={<Avatar>{post.user ? post.user.username.charAt(0).toUpperCase() : '?'}</Avatar>}
        >
          {/* Post Created Date */}
          <Typography type="secondary" style={{ fontSize: '0.6rem', textAlign: 'right', color: darkMode ? "white" : "black" }}>
            {post.createdDate ? new Date(post.createdDate).toLocaleString() : 'No date available'}
          </Typography>

          {/* Post Body */}
          <Typography style={{
              color: darkMode ? "white" : "black"
            }}>{post.body}</Typography>

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
            style={{ marginTop: '10px',  color: darkMode ? "white" : "black"}}
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