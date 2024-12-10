import React from "react";
import Home from "../components/Home";
import Navbar from "../components/NavBar";
import ProfileNav from "../components/ProfileNav"; // Import the SideNav component
import TrendingColumn from "../components/TrendingColumn";
import FriendsSuggestion from "../components/FriendsSuggestion";
import "../styles/ProfilePage.css";

const HomePage = () => {
  return (
    <>
    <Navbar />
    <div className="parent-profile" style={{ marginTop: "0px" }}>
      <div className="box-30">
        <div>
          <FriendsSuggestion />
        </div>
      </div>
      <div className="box-70">
        <Home />
      </div>
      <div className="box-trending">
          <TrendingColumn />
      </div>
    </div>
  </>
  );
};

export default HomePage;
