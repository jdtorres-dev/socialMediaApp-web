import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path='/login' element={<LoginPage />}/>

      <Route path='/home' element={<HomePage/>}/>
    </Routes>
  );
}

export default App;
