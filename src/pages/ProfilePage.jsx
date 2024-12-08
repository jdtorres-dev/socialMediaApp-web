import React from "react";
import Profile from "../components/Profile";
import Navbar from "../components/NavBar";

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "20px" }}>
        <Profile />
      </div>
    </>
  );
};

export default ProfilePage;
