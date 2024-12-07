import React, { useEffect } from "react";
import Home from "../components/Home";
import { useGetUserById } from "../queries/UserQueries";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuth();
  const { data: user } = useGetUserById(currentUser.id);

  useEffect(() => {}, [user]);

  return (
    <>
      <Home />
    </>
  );
};

export default HomePage;
