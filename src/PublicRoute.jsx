import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './LoginPage';

const PublicRoute = () => {
  
    return (
      <>
        <Route path="/login-page" element={<LoginPage/>} />
        <Navigate to='login-page' />
      </>
    )
  }
  
  export default PublicRoute;