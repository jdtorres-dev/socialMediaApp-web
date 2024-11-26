import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Home from "../components/Home";
import UserModal from "../components/UserModal";
import PostService from "../service/PostService";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostService
      .getAllpost()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);



  return (
    <>
      <Home posts={posts}/>
      <Button onClick={() => setOpenModal(true)}></Button>
      <UserModal isModalOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  )
};

export default HomePage;
