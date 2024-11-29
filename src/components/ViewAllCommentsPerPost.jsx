import { Button, Card, Col, Divider, Dropdown, Menu, message, Modal, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import { DashOutlined } from '@ant-design/icons';
import { useAuth } from "../context/AuthContext";
import PostService from '../service/PostService';


const ViewAllCommentsPerPost = ({ comments = [], onDeleteComment}) => {
    const { darkMode } = useTheme();
    const { currentUser } = useAuth();

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


    const settingsMenu = (commentId) => (
        <Menu>
            <Menu.Item
                key="1"
            //icon={<UserOutlined />}
            //onClick={() => setUpdateUser(true)}
            >
                Edit
            </Menu.Item>
            <Menu.Item
                key="2"
                onClick={() => showDeleteConfirm(commentId)}
            >
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <Col span={24} key={comment.id}>
                            <Row gutter={[16, 8]}>
                                <Col span={24}>
                                    <text style={{ color: darkMode ? "White" : "Black" }} strong>@{comment.user.username}</text>


                                    <text type="secondary" style={{ marginLeft: '8px', color: darkMode ? "White" : "Black", fontSize: '0.6rem', textAlign: "Right", marginRight: "260px" }}>
                                        {new Date(comment.createdDate).toLocaleString()}
                                    </text>
                                    {
                                        currentUser.id == comment.user.id && (
                                            <Dropdown style={{
                                                position: "absolute",
                                                border: "0px",
                                            }} overlay={settingsMenu(comment.id)} trigger={["click"]}>
                                                <DashOutlined style={{ color: "Blue", fontSize: "18px" }} />
                                            </Dropdown>
                                        )
                                    }

                                </Col>
                                <Col span={24}>
                                    <Typography style={{ color: darkMode ? "White" : "Black" }}>{comment.commentBody}</Typography>
                                </Col>
                            </Row>
                            <Divider />
                        </Col>
                    ))
                ) : (
                    <Col span={24}>
                        <Typography>No comments available.</Typography>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default ViewAllCommentsPerPost;
