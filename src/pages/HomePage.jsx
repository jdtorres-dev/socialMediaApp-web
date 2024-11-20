import React, { useState } from "react";
import { Button } from "antd";
import { useAuth } from "../context/AuthContext";

import UserModal from "../components/UserModal";

const HomePage = () => {
  const { logout } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div>HomePage</div>
      <Button onClick={() => logout()}>Logout</Button>
      <Button onClick={() => setOpenModal(true)}></Button>

      <UserModal isModalOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default HomePage;
