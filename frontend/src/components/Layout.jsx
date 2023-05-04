import { Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import Dashboard from "./Dashboard"
import Map from "./Map"
import ParkingSpace from "./ParkingSpace"
import Receipt from "./Receipt"
import Report from "./Report"
import Profile from "./Profile"


const HomePage = () => {

  return (
    <>
      <Sidebar />
      <div className="fixed top-0 w-4/5 right-0 h-screen bg-gray-50 dark:bg-gray-900 transition-transform -translate-x-full sm:translate-x-0 p-10" aria-label="Sidenav">
        <Routes>
          <Route path="/" element={<Navigate to="/home/dashboard" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map"  element={<Map />} />
          <Route path="/add-parking-space"  element={<ParkingSpace />} />
          <Route path="/receipt"  element={<Receipt />} />
          <Route path="/report"  element={<Report />} />
        </Routes>
      </div>
    </>
)
}

export default HomePage