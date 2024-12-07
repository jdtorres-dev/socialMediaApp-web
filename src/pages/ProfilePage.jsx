import React, { useEffect } from "react";
import Profile from "../components/Profile";
import Navbar from "../components/NavBar";
import { useGetUserById } from "../queries/UserQueries";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { data: user } = useGetUserById(currentUser.id);

  useEffect(() => {}, [user]);
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
