import React from 'react'
import Navbar from './NavBar'
import AddPost from "./AddPost";

const Home = () => {
  return (
    <>
    {/* <Navbar /> */}
    <div style={{ marginBottom: '20px' }}>
      <AddPost />
    </div>
  </>
  );
};


export default Home