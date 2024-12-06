import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import PostService from "../service/PostService";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const LikeUnlikeComment = ({ comment }) => {
  const { darkMode } = useTheme();
  const [liked, setLiked] = useState(null);
  const { currentUser } = useAuth();
  const [likeId, setLikeId] = useState(0);

  useEffect(() => {
    PostService.getLikeUnlikeComment(comment.id, currentUser.id)
      .then((response) => {
        if (response.data && response.data.isLike !== null) {
          setLiked(response.data.isLike);
          setLikeId(response.data.id);
        } else {
          setLiked(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching like and unlike", error);
        setLiked(false);
      });
  }, [comment.id, currentUser.id, liked]);

  const handleLike = async () => {
    try {
      const requestData = {
        comment: comment,
        user: currentUser,
      };
      console.log(requestData);

      await PostService.likeComment(requestData);
      setLiked(true);
      message.success("Liked Comment!");
    } catch (error) {
      console.error("Error liked comment", error);
      message.error("Error liking comment. Please try again.");
    }
  };

  const handleUnlike = async () => {
    console.log("likeid", likeId);
    try {
      console.log("Unliking post with ID:", likeId);
      await PostService.unlikeComment(likeId);
      message.success("Unliked Comment!");
      setLiked(false);
    } catch (error) {
      console.error("Error unliking comment", error);
      message.error("Error unliking post. Please try again.");
    }
  };

  return (
    <div>
      {liked === false && (
        <Button
          type="secondary"
          icon={<LikeOutlined />}
          onClick={handleLike}
          style={{
            marginTop: "15px",
            marginRight: "10px",
            color: darkMode ? "white" : "black",
          }}
        />
      )}
      {liked === true && (
        <Button
          type="secondary"
          icon={<DislikeOutlined />}
          onClick={handleUnlike}
          style={{ marginTop: "15px", color: darkMode ? "white" : "black" }}
        />
      )}
    </div>
  );
};

export default LikeUnlikeComment;