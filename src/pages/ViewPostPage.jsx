import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import ViewPost from "../components/ViewPost";
import PostService from "../service/PostService";
import { useAuth } from "../context/AuthContext";
import { useGetUserById } from "../queries/UserQueries";

const ViewPostPage = () => {
  const params = useParams();
  const postId = +params.id;
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState(null);
  const { currentUser } = useAuth();
  const { data: user } = useGetUserById(currentUser.id);

  useEffect(() => {
    PostService.getPostById(postId)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [postId, user]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!currentUser?.id) {
        console.error("No user ID found. Unable to fetch posts.");
        return;
      }

      try {
        const fetchedPosts = await PostService.getPostsByUserId(currentUser.id);
        setPosts(fetchedPosts.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentUser]);

  const onPostUpdate = (updatedPost) => {
    setPost(updatedPost);
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "20px" }}>
        <ViewPost
          post={post}
          setPost={setPost}
          setPosts={setPosts}
          onPostUpdate={onPostUpdate}
        />
      </div>
    </>
  );
};

export default ViewPostPage;
