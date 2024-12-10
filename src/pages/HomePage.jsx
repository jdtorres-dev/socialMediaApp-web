import React from "react";
import Home from "../components/Home";
import Navbar from "../components/NavBar";
import ProfileNav from "../components/ProfileNav"; // Import the SideNav component
import TrendingColumn from "../components/TrendingColumn";
import FriendsSuggestion from "../components/FriendsSuggestion";
import "../styles/ProfilePage.css";
import { useTheme } from "../context/ThemeContext";


const HomePage = () => {
  const { darkMode } = useTheme();

  return (
    <>
    <Navbar />
    <div className="parent-profile" style={{ marginTop: "0px"}}>
      <div className="box-30" style={{backgroundColor: darkMode ? "#3b3b3b" : "White"}}>
        <div>
          <FriendsSuggestion />
        </div>
      </div>
      <div className="box-70" style={{backgroundColor: darkMode ? "#3b3b3b" : "White"}}>
        <Home />
      </div>
      <div className="box-trending" style={{backgroundColor: darkMode ? "#3b3b3b" : "White"}}>
          <TrendingColumn />
      </div>
    </div>
  </>
  );
};

export default HomePage;
