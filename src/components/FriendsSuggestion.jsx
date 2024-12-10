import React, { useState, useEffect } from "react";
import { Input, List, Card, Avatar, Button, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTheme } from "../context/ThemeContext";
const friendsData = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "@alice_johnson01",
    avatar: "https://www.svgrepo.com/show/446531/avatar.svg",
  },
  { id: 2, name: "Bob Smith", username: "@b.smith", avatar: "" },
  {
    id: 3,
    name: "Charlie Brown",
    username: "@brownies",
    avatar: "https://www.svgrepo.com/show/446486/avatar.svg",
  },
  { id: 4, name: "Diana Prince", username: "@princeDiana99", avatar: "" },
  { id: 5, name: "Eve Adams", username: "@evahhhh", avatar: "" },
];

const FriendsSuggestion = () => {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState(friendsData);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 887);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = friendsData.filter((friend) =>
      friend.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleAddFriend = (friendId) => {
    console.log("Add friend with ID:", friendId);
    // Logic to send a friend request
  };

  const dropdownMenu = (
    <Menu>
      {suggestions.map((friend) => (
        <Menu.Item key={friend.id}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={friend.avatar || null}
              icon={!friend.avatar && <UserOutlined />}
              style={{ marginRight: "10px" }}
            />
            <span style={{ color: darkMode ? "white" : "black" }}>
              {friend.name}
            </span>
            <Button
              type="link"
              size="small"
              onClick={() => handleAddFriend(friend.id)}
              style={{ marginLeft: "auto" }}
            >
              Add
            </Button>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div
      className="friendsSuggestion-container"
      style={{ backgroundColor: darkMode ? "#3b3b3b" : "White" }}
    >
      <Dropdown
        overlay={isMobileView && suggestions.length > 0 ? dropdownMenu : null}
        trigger={["click"]}
        visible={isMobileView && searchTerm !== ""}
      >
        <Input
          placeholder="Search friends"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: "20px" }}
        />
      </Dropdown>
      {!isMobileView && (
        <List
          style={{
            backgroundColor: darkMode ? "#3b3b3b" : "white",
          }}
          itemLayout="horizontal"
          dataSource={suggestions}
          renderItem={(friend) => (
            <List.Item>
              <Card
                style={{
                  width: "100%",
                  backgroundColor: darkMode ? "#3b3b3b" : "white",
                  // boxShadow: darkMode ? "0px 4px 6px rgba(0,0,0,0.1)" : "none",
                  border: darkMode
                    ? "1px solid rgba(0, 0, 0, 0.2)"
                    : "1px solid #f5f5f5",
                }}
              >
                <Card.Meta
                  avatar={
                    friend.avatar ? (
                      <Avatar
                        src={friend.avatar}
                        size={50}
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                    ) : (
                      <Avatar
                        icon={<UserOutlined />}
                        size={50}
                        style={{ marginTop: 8, marginLeft: 10 }}
                      />
                    )
                  }
                  title={
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          color: darkMode ? "white" : "black",
                          fontSize: "13px",
                        }}
                      >
                        {friend.name}
                      </div>
                      <div
                        style={{
                          marginTop: -3,
                          color: darkMode ? "white" : "gray",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        {friend.username}
                      </div>
                    </div>
                  }
                  description={
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleAddFriend(friend.id)}
                      style={{ fontSize: 12 }}
                    >
                      Add Friend
                    </Button>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default FriendsSuggestion;
