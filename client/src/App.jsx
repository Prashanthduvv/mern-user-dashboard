import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UsersListPage from './pages/UsersListPage';
import UserCreatePage from './pages/UserCreatePage';
import UserEditPage from './pages/UserEditPage';
import UserDetailsPage from './pages/UserDetailsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App(){
  return (
    <div className="container">
      <header style={{padding:'10px 0'}}>
        <Link to="/"><h1>MERN User Dashboard</h1></Link>
      </header>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<UsersListPage/>} />
        <Route path="/create" element={<UserCreatePage/>} />
        <Route path="/users/:id" element={<UserDetailsPage/>} />
        <Route path="/users/:id/edit" element={<UserEditPage/>} />
      </Routes>
    </div>
  );
}
