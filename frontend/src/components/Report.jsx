import { useContext, useLayoutEffect, useState } from "react";
import BookingsContext from "../context/BookingsContext";
import UserContext from "../context/UserContext";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import ReportTable from "./ReportTable";
import { Pagination } from "flowbite-react";

import Unavailable from "../assets/animations/not-available.json";

const Report = () => {
  const [bookingsData, setBookingsData] = useContext(BookingsContext);
  const { userDetails } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);

  //fetch motorist bookings data
  const fetchMotoristBookings = async (id) => {
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/get-motorist-bookings/${id}`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.status === 200) {
      const bookings = [];

      let bookingData = Array.from(data.bookings);

      bookingData.forEach((book) => {
        bookings.push(book);
      });

      setBookingsData(bookings);
      return;
    }
  };

  //fetch owners bookings data
  const fetchOwnerBookings = async (id) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/get-owner-bookings/${id}`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.status === 200) {
      const bookings = [];

      let bookingData = Array.from(data.bookings);

      bookingData.forEach((book) => {
        bookings.push(book);
      });

      setBookingsData(bookings);

      return;
    }

    setBookingsData([]);
  };

  //generatean excel file with report details
  const generateExcelReport = () => {
    const data = bookingsData.map((booking) => {
      const {
        date,
        parking_name,
        parking_address,
        parking_slot,
        from_time,
        to_time,
        parking_duration,
        total_fees,
      } = booking;

      return {
        date: date,
        parking_name: parking_name,
        parking_address: parking_address,
        parking_slot: parking_slot,
        from_time: from_time,
        to_time: to_time,
        parking_duration: parking_duration,
        total_fees: total_fees,
      };
    });

    const excelData = data.reverse();

    let wb = XLSX.utils.book_new();

    let ws = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(wb, ws, "ParkingReport");

    XLSX.writeFile(wb, "ParkingReport.xlsx");
  };

  useLayoutEffect(() => {
    if (userDetails.userCategory == "motorist") {
      fetchMotoristBookings(userDetails.id);
    }

    if (userDetails.userCategory == "park-owner") {
      fetchOwnerBookings(userDetails.id);
    }
  }, []);

  //if no bookings data
  if (bookingsData.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800">
        <h3 className="text-xl font-bold dark:text-white">
          Looks like there is no report. Check back after booking have been
          done.
        </h3>

        <Lottie animationData={Unavailable} loop={true} className="w-52" />

        {userDetails.userCategory === "park-owner" ? (
          <>
            <Link
              to="/home/list-parking-space"
              className="mb-1 text-xl underline font-medium text-gray-900 dark:text-white hover:text-primary-600"
            >
              List parking space if not yet listed
            </Link>
          </>
        ) : (
          <Link
            to="/home/map"
            className="mb-1 text-xl underline font-medium text-gray-900 dark:text-white hover:text-primary-600"
          >
            Book Parking Space
          </Link>
        )}
      </div>
    );
  }

  const itemsPerPage = 7;

  // Calculate the total number of pages based on the data length and items per page.
  const totalPages = Math.ceil(bookingsData.length / itemsPerPage);

  // Calculate the start and end indices for the current page.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Extract the data for the current page.
  const currentData = bookingsData.reverse().slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex items-start mb-8">
        <h3 className="text-3xl font-bold dark:text-white">Report</h3>
      </div>

      <div className="mb-2">
        <div className="flex items-center justify-between pb-4">
          <div>
            <button
              type="button"
              onClick={generateExcelReport}
              className="inline-flex items-center gap-2 text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primary-400 dark:text-primary-400 dark:hover:text-white dark:hover:bg-primary-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="main-grid-item-icon"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span>Download Report</span>
            </button>
          </div>
        </div>
        <div>
          <ReportTable bookings={currentData} />
          <Pagination
            currentPage={currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            showIcons
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Report;
