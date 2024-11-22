import React, { useState } from "react";
import { Button } from "antd";
import { useAuth } from "../context/AuthContext";
import Home from "../components/Home";

import UserModal from "../components/UserModal";

const HomePage = () => {
  const { logout } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      
      <Home/>
      <Button onClick={() => setOpenModal(true)}></Button>
      <UserModal isModalOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  )
};

export default HomePage;
