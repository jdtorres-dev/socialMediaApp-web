import React from "react";
import Profile from "../components/Profile";
import Navbar from "../components/NavBar";
import ProfileNav from "../components/ProfileNav"; // Import the SideNav component
import TrendingColumn from "../components/TrendingColumn";
import "../styles/ProfilePage.css";
import { useTheme } from "../context/ThemeContext";

const ProfilePage = () => {
  const { darkMode } = useTheme();

  return (
    <>
      <Navbar />
      {/* <div className="parent-profile" style={{ marginTop: "0px" }}>
        <div className="container">
          <div className="box-30">
            <div>
              <ProfileNav />
            </div>
          </div>
          <div className="box-70"><Profile /></div>
        </div>
      </div> */}
      <div className="parent-profile" style={{ marginTop: "0px",  backgroundColor: darkMode ? "#3b3b3b" : "White" }}>
        <div className="box-30" style={{ backgroundColor: darkMode ? "#3b3b3b" : "White"}}>
          <div>
            <ProfileNav />
          </div>
        </div>
        <div className="box-70" style={{ backgroundColor: darkMode ? "#3b3b3b" : "White"}}>
          <Profile />
        </div>
        <div className="box-trending" style={{ backgroundColor: darkMode ? "#3b3b3b" : "White"}}>
            <TrendingColumn />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
