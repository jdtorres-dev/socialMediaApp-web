import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../service/AuthService";
import { message } from "antd";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        const decoded = jwtDecode(accessToken);

        setCurrentUser({
          id: decoded.sub,
          username: decoded.username,
          name: decoded.name,
          email: decoded.email,
        });
      } else {
        localStorage.clear();
      }
    };

    checkToken();
  }, [navigate]);

  const login = async (login) => {
    try {
      const { accessToken } = await AuthService.login(login);

      const decoded = jwtDecode(accessToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("id", decoded.sub);
      localStorage.setItem("username", decoded.username);
      localStorage.setItem("name", decoded.name);
      localStorage.setItem("email", decoded.email);

      setCurrentUser({
        id: decoded.id,
        name: decoded.name,
        username: decoded.username,
        email: decoded.email,
      });

      navigate("/home");

      message.success("Access Granted");
    } catch (error) {
      console.log("Error", error);

      if (error.response && error.response.status < 500) {
        localStorage.clear();
        message.error(
          "Oops! It seems that your login details are incorrect. Please check your username and password."
        );
        navigate("/login");
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setCurrentUser({
      id: null,
      name: "",
      username: "",
      email: "",
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
