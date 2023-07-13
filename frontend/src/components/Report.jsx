import { useContext, useEffect } from "react";
import BookingsContext from "../context/BookingsContext";
import UserContext from "../context/UserContext";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

import Unavailable from "../assets/animations/not-available.json";

const Report = () => {
  const [bookingsData, setBookingsData] = useContext(BookingsContext);
  const lastSevenBookings = bookingsData.slice(0, 6);
  const { userDetails } = useContext(UserContext);

  //fetch motorist bookings data
  const fetchMotoristBookings = async (id) => {
    const url = `http://localhost:8000/get-motorist-bookings/${id}`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.status === 200) {
      const bookings = [];

      let bookingData = Array.from(data.bookings);

      bookingData.forEach((book) => {
        bookings.push(book);
      });

      console.log(bookings);
      setBookingsData(bookings);
      return;
    }
  };

  //fetch owners bookings data
  const fetchOwnerBookings = async (id) => {
    const url = `http://localhost:8000/get-owner-bookings/${id}`;

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
          No Records available. Records will be displayed once parking is
          booked.
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
              id="dropdownRadioButton"
              data-dropdown-toggle="dropdownRadio"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <svg
                className="w-4 h-4 mr-2 text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Last 30 days
              <svg
                className="w-3 h-3 ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              id="dropdownRadio"
              className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="top"
              style={{
                position: "absolute",
                inset: "auto auto 0px 0px",
                margin: "0px",
                transform: "translate3d(522.5px, 3847.5px, 0px)",
              }}
            >
              <ul
                className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownRadioButton"
              >
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-1"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="filter-radio-example-1"
                      className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last day
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-2"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="filter-radio-example-2"
                      className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last 7 days
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-3"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="filter-radio-example-3"
                      className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last 30 days
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-4"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="filter-radio-example-4"
                      className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last month
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-5"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="filter-radio-example-5"
                      className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Last year
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button
              type="button"
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
    </>
  );
};

export default Report;
