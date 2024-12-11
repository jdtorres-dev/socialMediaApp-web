import React from "react";
import Profile from "../components/Profile";
import Navbar from "../components/NavBar";
import ProfileNav from "../components/ProfileNav"; // Import the SideNav component
import TrendingColumn from "../components/TrendingColumn";
import "../styles/ProfilePage.css";
import { useTheme } from "../context/ThemeContext";
import FriendProfile from "../components/FriendProfile";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { darkMode } = useTheme();

  const { currentUser } = useAuth();

  const { id } = useParams(); // Get the user ID from the URL

   // Debug: Print the current user
  //  console.log("Current User:", currentUser);
  //  console.log("id:", id);
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
            <ProfileNav userId={id} />
          </div>
        </div>
        <div className="box-70" style={{ backgroundColor: darkMode ? "#3b3b3b" : "White"}}>
          {/* <Profile /> */}
          {id == currentUser?.id ? (
            <Profile /> // Show Profile component if the user is the current user
          ) : (
            <FriendProfile userId={id} />
          )}
        </div>
        <div className="box-trending" style={{ backgroundColor: darkMode ? "#3b3b3b" : "White"}}>
            <TrendingColumn />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
