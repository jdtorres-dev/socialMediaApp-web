import React from "react";
import Profile from "../components/Profile";
import Navbar from "../components/NavBar";
import ProfileNav from "../components/ProfileNav"; // Import the SideNav component
import TrendingColumn from "../components/TrendingColumn";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
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
      <div className="parent-profile" style={{ marginTop: "0px" }}>
        <div className="box-30">
          <div>
            <ProfileNav />
          </div>
        </div>
        <div className="box-70">
          <Profile />
        </div>
        <div className="box-trending">
            <TrendingColumn />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
