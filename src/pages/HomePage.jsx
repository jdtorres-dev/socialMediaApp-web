import React, { useEffect, useState } from "react";
import Home from "../components/Home";
import PostService from "../service/PostService";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    PostService.getAllpost()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <>
      <Home posts={posts} />
    </>
  );
};

export default HomePage;
