import { Navigate, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import "./App.css";
import ViewPostPage from "./pages/ViewPostPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuth();

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" />} />

      <Route
        path="/home"
        element={currentUser.id ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={currentUser.id ? <ProfilePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/post/:id"
        element={currentUser.id ? <ViewPostPage /> : <Navigate to="/login" />}
      />
      {/* <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/post/:id" element={<ViewPostPage />} /> */}
    </Routes>
  );
}

export default App;
