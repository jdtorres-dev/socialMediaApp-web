import React from 'react'
import Navbar from './NavBar'
import AddPost from "./AddPost";

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