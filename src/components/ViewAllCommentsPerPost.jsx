import { Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';
import { useTheme } from "../context/ThemeContext";


const ViewAllCommentsPerPost = ({ comments = [] }) => {
    const { darkMode } = useTheme();

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <Col span={24} key={comment.id}>
                                <Row gutter={[16, 8]}>
                                    <Col span={24}>
                                        <text style={{color: darkMode? "White" : "Black"}} strong>@{comment.user.username}</text>
                                        <text type="secondary" style={{ marginLeft: '8px' , color: darkMode? "White" : "Black"}}>
                                            {new Date(comment.createdDate).toLocaleString()}
                                        </text>
                                    </Col>
                                    <Col span={24}>
                                        <Typography style={{color: darkMode? "White" : "Black"}}>{comment.commentBody}</Typography>
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
