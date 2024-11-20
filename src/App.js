import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

import "./App.css";
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
      <Route path="/home" element={<HomePage  />}/>

      <Route path='/home' element={<HomePage/>} />
    </Routes>
  );
}

export default App;
