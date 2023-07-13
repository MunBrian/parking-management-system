import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./components/Layout";
import SignUpOwner from "./pages/SignUpOwner";
import { UserProvider } from "./context/UserContext";
import { ParkingProvider } from "./context/ParkingContext";
import { BookingsProvider } from "./context/BookingsContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <UserProvider>
        <ParkingProvider>
          <BookingsProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup-parkowner" element={<SignUpOwner />} />
              <Route path="/home/*" element={<HomePage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </BookingsProvider>
        </ParkingProvider>
      </UserProvider>
      <ToastContainer />
    </>
  );
}

export default App;
