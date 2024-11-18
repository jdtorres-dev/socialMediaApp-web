import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;