import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../service/AuthService";
import { message } from "antd";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
  });

  const navigate = useNavigate();

  // Check token when app loads (e.g. on refresh)
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      console.log("Decoded Token on Page Load: ", decoded); // Debug log

      setCurrentUser({
        id: decoded.sub,
        name: decoded.name,
        username: decoded.username,
        email: decoded.email,
      });
    }
  }, []);

  // Login method (stores token in localStorage and redirects to /home)
  const login = async (login) => {
    try {
      const { accessToken } = await AuthService.login(login);
      console.log("Access Token:", accessToken); // Debug log

      const decoded = jwtDecode(accessToken);

      // Store token and user info
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("id", decoded.sub);
      // localStorage.setItem("username", decoded.username);
      // localStorage.setItem("name", decoded.name);
      // localStorage.setItem("email", decoded.email);

      // Set user state
      setCurrentUser({
        id: decoded.sub,
        name: decoded.name,
        username: decoded.username,
        email: decoded.email,
      });

      // Debug log before navigation
      console.log("Navigating to /home...");

      // Navigate to /home
      navigate("/home");

      message.success("You have successfully logged in!");
    } catch (error) {
      console.log("Error during login:", error);

      if (error.response && error.response.status < 500) {
        localStorage.clear();
        message.error("Invalid login details. Please try again.");
        navigate("/login");
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    setCurrentUser({
      id: null,
      name: "",
      username: "",
      email: "",
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
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
