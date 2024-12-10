import React from 'react';
import { List, Card } from "antd";
import { useTheme } from "../context/ThemeContext";

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
  {
    id: 4,
    title: "News / Tech",
    description:
      "TikTok Will Block Teenaers from Using Beauty Filters Over Mental Health Concerns.",
    imageUrl:
      "https://whatstrending.com/video/tiktok-will-block-teenagers-from-using-beauty-filters-over-mental-health-concerns/",
  },
  {
    id: 5,
    title: "Movies",
    description: `Social Media Piracy Spurs Debate Over "Wicked" and Movie Theater Behavior`,
    imageUrl:
      "https://whatstrending.com/social-media-piracy-spurs-debate-over-wicked-and-movie-theater-behavior/",
  },
  {
    id: 6,
    title: "Lifestyle",
    description:
      "Dan Life: The Visionary Artist and How He Blends Pop Culture, Fashion, and Art into a Global Phenomenon",
    imageUrl:
      "https://whatstrending.com/daniel-jacob-the-visionary-artist-behind-dan-life-blends-pop-culture-fashion-and-art-into-a-global-phenomenon/",
  },
  {
    id: 7,
    title: "Music / News",
    description: `Shocking Allegations Rock Jay-Z's Empire: Fans Demand Beyoncé's Divorce for Family's Future`,
    imageUrl:
      "https://whatstrending.com/video/shocking-allegations-rock-jay-zs-empire-fans-demand-beyonces-divorce-for-familys-future/",
  },
  {
    id: 8,
    title: "Lifestyle / News",
    description: "Viral Celebrity Lookalike TikTok Trend Cultivates Community",
    imageUrl:
      "https://whatstrending.com/video/viral-tiktok-celebrity-lookalike-contest-trend-cultivates-community/",
  },
  {
    id: 9,
    title: "Music",
    description: `Spotify Wrapped 2024 Fails to Impress Fans, Taylor Swift's Major Milestones`,
    imageUrl:
      "https://whatstrending.com/video/spotify-wrapped-2024-fails-to-impress-fans-taylor-swifts-major-milestones/",
  },
  {
    id: 10,
    title: "Tech",
    description:
      "Facebook Gaming Sees Decline with Kick and YouTube Gaming on the Come Up",
    imageUrl:
      "https://whatstrending.com/facebook-gaming-sees-decline-with-kick-and-youtube-gaming-on-the-come-up/",
  },
];

const TrendingColumn = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className="trendingColumns-container"
      style={{ backgroundColor: darkMode ? "#3b3b3b" : "White" }}
    >
      <Card
        title={
          <span style={{ color: darkMode ? "white" : "black" }}>
            What's Trending
          </span>
        }
        bordered={false}
        style={{
          width: "auto",
          backgroundColor: darkMode ? "#3b3b3b" : "White",
        }}
      >
        <List
          style={{ marginTop: -20 }}
          itemLayout="horizontal"
          dataSource={trendingData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                // avatar={<Avatar src={item.imageUrl} />}
                title={
                  <span style={{ color: darkMode ? "white" : "black" }}>
                    <a href={`/trending/${item.id}`}>{item.title}</a>
                  </span>
                }
                description={
                  <span style={{ color: darkMode ? "white" : "black" }}>
                    {item.description}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default TrendingColumn;
