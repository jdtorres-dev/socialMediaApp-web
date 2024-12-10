import React from "react";
import { Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

const IconWithTextCard = ({ icon, title, description }) => {
  return (
    <Row
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        padding: "12px",
        alignItems: "center",
        // maxWidth: "300px",
        minWidth: "200px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        display: "flex"
      }}
    >
      {/* Icon on the Left */}
      <Col style={{ marginRight: "16px" }}>{icon}</Col>

      {/* Text and Description on the Right */}
      <Col>
        <Title level={5} style={{ margin: 0 }}>
          {title}
        </Title>
        <Text type="secondary">{description}</Text>
      </Col>
    </Row>
  );
};

export default IconWithTextCard;
