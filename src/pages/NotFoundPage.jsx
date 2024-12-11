import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useTheme } from "../context/ThemeContext";

import "../styles/NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <>
      <div className="container-login">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: darkMode ? "white" : "black",
            marginTop: -100,
          }}
        >
          <div style={{ fontSize: 90 }}>
            4
            <img
              src="https://www.svgrepo.com/show/54422/crying.svg"
              alt="not-found"
              style={{ height: 80, width: 80, paddingTop: 100 }}
            />
            4
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
            type="primary"
            style={{
              marginTop: 30,
              borderRadius: 15,
            }}
            onClick={() => {
              // navigate(-3);
              navigate("/home");
            }}
          >
            Go back
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
