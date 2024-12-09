import React from 'react';
import { List, Avatar, Typography, Card } from 'antd';

const { Title } = Typography;

// Dummy trending data
const trendingData = [
  {
    id: 1,
    title: "The Rise of Electric Vehicles",
    description: "Explore the latest trends in EVs and sustainable transport.",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    title: "Top 10 Movies of the Year",
    description: "Check out the most popular movies of 2024.",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    title: "Sustainable Living Tips",
    description: "Learn how to live sustainably in 2024.",
    imageUrl: "https://via.placeholder.com/50",
  },
];

const TrendingColumn = () => {
  return (
    <div className="trendingColumns-container">
        <Card title="What's Trending" bordered={false} style={{ width: "auto" }}>
        <List
            itemLayout="horizontal"
            dataSource={trendingData}
            renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={item.imageUrl} />}
                title={<a href={`/trending/${item.id}`}>{item.title}</a>}
                description={item.description}
                />
            </List.Item>
            )}
        />
        </Card>
    </div>
  );
};

export default TrendingColumn;
