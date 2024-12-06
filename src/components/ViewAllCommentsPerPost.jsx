import {
  Col,
  Divider,
  Dropdown,
  Menu,
  Modal,
  Typography,
  Avatar,
  Row,
} from "antd";
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { PiDotsThreeBold } from "react-icons/pi";
import { useAuth } from "../context/AuthContext";
import UpdateComment from "./UpdateComment";
import LikeUnlikeComment from "./LikeUnlikeComment";

const ViewAllCommentsPerPost = ({
  comments = [],
  onDeleteComment,
  onUpdateComment,
}) => {
  const { darkMode } = useTheme();
  const { currentUser } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const showDeleteConfirm = (commentId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this comment?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => onDeleteComment(commentId),
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedComment(null);
  };

  const handleEditClick = (comment) => {
    setSelectedComment(comment);
    setIsModalVisible(true);
  };

  const settingsMenu = (commentId, comment) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEditClick(comment)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => showDeleteConfirm(commentId)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ padding: "8px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Avatar src={comment.user?.imageUrl}>
                    {!comment.user?.imageUrl && comment.user?.username
                      ? comment.user.username.charAt(0).toUpperCase()
                      : null}
                  </Avatar>

                  <Typography
                    level={4}
                    style={{
                      color: darkMode ? "white" : "black",
                      fontWeight: "600",
                      paddingRight: "3px",
                      paddingLeft: "5px",
                    }}
                  >
                    {comment.user ? comment.user.name : "Unknown"}
                  </Typography>

                  <Typography
                    level={4}
                    style={{
                      color: darkMode ? "white" : "black",
                      fontSize: "11px",
                    }}
                  >
                    @{comment.user ? comment.user.username : "Unknown"}
                  </Typography>
                </div>
                <div>
                  {comment.user.id === Number(currentUser.id) && (
                    <Dropdown
                      style={{
                        position: "absolute",
                        border: "0px",
                      }}
                      overlay={settingsMenu(comment.id, comment)}
                      trigger={["click"]}
                    >
                      <PiDotsThreeBold
                        style={{
                          color: darkMode ? "lightgray" : "blue",
                          fontSize: "20px",
                        }}
                      />
                    </Dropdown>
                  )}
                </div>
              </div>
              <Col span={24}>
                <Row
                  style={{
                    alignItems: "end",
                    justifyContent: "end",
                  }}
                >
                  <text
                    type="secondary"
                    style={{
                      marginLeft: "8px",
                      color: darkMode ? "white" : "black",
                      fontSize: "0.6rem",
                    }}
                  >
                    {new Date(comment.createdDate).toLocaleString()}
                  </text>
                </Row>
              </Col>
              <Col span={24}>
                <Typography
                  style={{
                    color: darkMode ? "White" : "Black",
                    marginLeft: "38px",
                  }}
                >
                  {comment.commentBody}
                </Typography>
              </Col>
              <LikeUnlikeComment comment={comment} />
              <Divider />
            </div>
          ))
        ) : (
          <Col span={24}>
            <Typography>No comments available.</Typography>
          </Col>
        )}
      </div>

      {/* Modal for editing the comment */}
      <Modal
        className={darkMode ? "ant-modal-dark" : ""}
        title="Edit Comment"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <UpdateComment
          comment={selectedComment}
          onClose={handleModalClose}
          onUpdate={onUpdateComment}
        />
      </Modal>
    </div>
  );
};

export default ViewAllCommentsPerPost;
