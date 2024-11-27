import React from 'react'
import Navbar from './NavBar'
import AddPost from './AddPost'
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import PostCards from './PostCards';

const Home = () => {
  return (
    <>
    <Navbar />
    <div style={{ marginTop: '20px' }}>
      <AddPost />
    </div>
  </>
  );
};


export default Home