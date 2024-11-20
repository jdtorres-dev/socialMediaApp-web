import React from "react";
import { Button } from "antd";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { logout } = useAuth();

  return (
    <>
      <div>HomePage</div>
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
};

export default HomePage;
