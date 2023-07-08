import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Map from "./Map";
import ParkingSpace from "./ListParkingSpace";
import Receipt from "./Receipt";
import Report from "./Report";
import Profile from "./Profile";
import Book from "./Book";
import Spinner from "./Spinner";

const HomePage = () => {
  const navigate = useNavigate();

  const { setUserDetails, userDetails } = useContext(UserContext);

  //fetch user data using token
  const fetchUserDetails = async (token) => {
    const url = "http://localhost:8000/dashboard";

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { headers });

    if (response.status === 401) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  };

  useEffect(() => {
    //get token from local storage
    const userToken = localStorage.getItem("user-data");

    const fetchUserData = async () => {
      try {
        const user = await fetchUserDetails(userToken);

        console.log(user.user);
        setUserDetails(user.user);
      } catch (error) {
        if (error.message === "Unauthorized") {
          console.log("Unathorized error", error);
          navigate("/login");
        } else {
          console.error("Error:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const userData = localStorage.getItem("user-data");

  if (!userData) {
    return <Navigate to="/login" />;
  }

  if (Object.keys(userDetails).length === 0) {
    return <Spinner />;
  }

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
