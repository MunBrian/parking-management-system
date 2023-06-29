import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Map from "./Map";
import ParkingSpace from "./ListParkingSpace";
import Receipt from "./Receipt";
import Report from "./Report";
import Profile from "./Profile";
import Book from "./Book";
import { useEffect } from "react";

const HomePage = () => {
  //fetch user data using token
  const fetchUserDetails = async (token) => {
    const url = "http://localhost:8000/dashboard";

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = await fetch(url, { headers });

    const response = await data.json();

    console.log(response);
  };

  useEffect(() => {
    //get token from local storage
    const userToken = localStorage.getItem("user-data");

    fetchUserDetails(userToken);
  }, []);

  return (
    <>
      <Sidebar />
      <div
        className="fixed top-0 w-4/5 right-0 overflow-auto h-screen bg-gray-50 dark:bg-gray-900 transition-transform -translate-x-full sm:translate-x-0 p-10"
        aria-label="Sidenav"
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home/dashboard" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/book" element={<Book />} />
          <Route path="/add-parking-space" element={<ParkingSpace />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </>
  );
};

export default HomePage;
