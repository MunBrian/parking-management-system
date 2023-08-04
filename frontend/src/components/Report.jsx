import { useContext, useEffect } from "react";
import BookingsContext from "../context/BookingsContext";
import UserContext from "../context/UserContext";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Unavailable from "../assets/animations/not-available.json";

const Report = () => {
  const [bookingsData, setBookingsData] = useContext(BookingsContext);
  const lastSevenBookings = bookingsData.slice(-7).reverse();
  const { userDetails } = useContext(UserContext);

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

      console.log(data.bookings);

      let bookingData = Array.from(data.bookings);

      bookingData.forEach((book) => {
        bookings.push(book);
      });

      console.log(bookings);
      setBookingsData(bookings);
      return;
    }

    setBookingsData([]);
  };

  //generate lastes parking report
  const generateReportPDF = () => {
    const input = document.getElementById("receipt"); // ID of the container element to be converted

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a3");
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 280, 300); // Adjust the coordinates and dimensions as per your requirements

      pdf.setTextColor(17, 24, 39);
      pdf.save("receipt.pdf");
    });
  };

  useEffect(() => {
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
          Report not available. Report will be displayed once parking is booked.
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
  return (
    <>
      <div className="flex items-start mb-8">
        <h3 className="text-3xl font-bold dark:text-white">Report</h3>
      </div>

      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-between pb-4">
          <div>
            <button
              type="button"
              onClick={generateReportPDF}
              className="inline-flex items-center gap-2 text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primary-400 dark:text-primary-400 dark:hover:text-white dark:hover:bg-primary-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                class="main-grid-item-icon"
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
        <div id="receipt">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Parking Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Parking Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Parking Slot
                </th>
                <th scope="col" className="px-6 py-3">
                  Parking Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Charges
                </th>
              </tr>
            </thead>
            <tbody>
              {lastSevenBookings.map((booking) => (
                <tr
                  key={booking.ID}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {booking.date}
                  </th>
                  <td className="px-6 py-4">{booking.parking_name}</td>
                  <td className="px-6 py-4">{booking.parking_address}</td>
                  <td className="px-6 py-4">{booking.parking_slot}</td>
                  <td className="px-6 py-4">{booking.parking_duration} hr</td>
                  <td className="px-6 py-4">ksh {booking.total_fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Report;
