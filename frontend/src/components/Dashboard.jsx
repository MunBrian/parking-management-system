import { useContext, useLayoutEffect } from "react";
import UserContext from "../context/UserContext";
import MotoristBarChart from "./MotoristBarChart";
import MotoristDashboardTable from "./MotoristDashboardTable";
import BookingsContext from "../context/BookingsContext";
import Loading from "./Loading";

const Dashboard = () => {
  const [bookingsData, setBookingsData] = useContext(BookingsContext);
  const { userDetails } = useContext(UserContext);
  useContext(UserContext);

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

  useLayoutEffect(() => {
    if (
      Object.keys(userDetails).length > 0 &&
      userDetails.userCategory === "motorist"
    ) {
      fetchMotoristBookings(userDetails.id);
      return;
    }

    if (
      Object.keys(userDetails).length > 0 &&
      userDetails.userCategory === "park-owner"
    ) {
      fetchOwnerBookings(userDetails.id);
      return;
    }
  }, [userDetails]);

  //if no user
  if (Object.keys(userDetails).length === 0) {
    return <Loading />;
  }

  let bookingMinutes = 0;
  let totalParkingCharges = 0;

  if (bookingsData.length > 0) {
    bookingsData.forEach((booking) => {
      bookingMinutes += booking.parking_duration;
      totalParkingCharges += booking.total_fees;
    });
  }

  return (
    <>
      <div className="flex items-start mb-8">
        <h3 className="text-3xl font-bold dark:text-white">Dashboard</h3>
      </div>
      <div className="block mb-4 md:grid md:grid-cols-2 md:gap-3 md:mb-8">
        <div className="block p-6 h-44 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
              Total Time Booked
            </h5>
            <p className="text-4xl font-bold text-primary-600">
              {bookingsData.length > 0 ? bookingMinutes * 60 : "0"} minutes
            </p>
          </div>
        </div>
        <div className="block mt-4 md:mt-0 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            {userDetails.userCategory === "motorist" ? (
              <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
                Total Spent
              </h5>
            ) : (
              <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
                Total Collection
              </h5>
            )}
            <p className="text-4xl font-bold text-primary-600">
              Ksh {bookingsData.length > 0 ? totalParkingCharges : "0"}
            </p>
          </div>
        </div>
      </div>
      <div className="md:block lg:grid lg:gap-x-3 lg:grid-cols-2">
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            {userDetails.userCategory === "motorist" ? (
              <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
                Money spent this week
              </h5>
            ) : (
              <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
                Money Collected this week
              </h5>
            )}
            <MotoristBarChart />
          </div>
        </div>
        <div className="p-4 mt-4 lg:mt-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
              Last 5 bookings
            </h5>
            <MotoristDashboardTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
