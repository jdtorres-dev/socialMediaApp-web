import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import Navbar from "../components/NavBar";
import ProfileNav from "../components/ProfileNav"; // Import the SideNav component
import TrendingColumn from "../components/TrendingColumn";
import "../styles/ProfilePage.css";
import { useTheme } from "../context/ThemeContext";
import FriendProfile from "../components/FriendProfile";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { message, Spin } from "antd";
import PostService from "../service/PostService";
import UserService from "../service/UserService";

const ProfilePage = () => {
  const { darkMode } = useTheme();

  const { currentUser } = useAuth();

  const { id } = useParams(); // Get the user ID from the URL

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

   // Debug: Print the current user
  //  console.log("Current User:", currentUser);
  //  console.log("id:", id);

  useEffect(() => {
      UserService.getUserById(id) 
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  )

  useEffect(() => {
    if (user === null) {
      const timeoutId = setTimeout(() => {
        navigate("/not-found");
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [user, navigate]);

  if (user === null) {
    return (
      <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <Spin size="large" />
        <p style={{ color: darkMode ? "white" : "black", marginLeft: "10px" }}>
          Loading post...
        </p>
      </div>
      </>
    );
  }


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
