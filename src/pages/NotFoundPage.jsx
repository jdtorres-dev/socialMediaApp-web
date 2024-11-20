import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { BsEmojiTear } from "react-icons/bs";

import "../styles/NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-login">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 70 }}>
            4<BsEmojiTear style={{ paddingTop: 10 }} />4
          </div>
          <div
            style={{ marginTop: -10, fontWeight: "bold", textAlign: "center" }}
          >
            OOPS! PAGE NOT FOUND
          </div>
          <div
            style={{
              color: "grey",
              fontSize: 12,
              paddingTop: 20,
              textAlign: "center",
            }}
          >
            Sorry but the page you are looking for does not exist, have been
          </div>
          <div style={{ color: "grey", fontSize: 12, textAlign: "center" }}>
            removed, name changed or is temporary unavailable
          </div>
          <Button
            style={{
              marginTop: 30,
              color: "white",
              backgroundColor: "orange",
              borderRadius: 15,
            }}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Go to Login Page
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
