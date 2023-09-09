import { useContext } from "react";
import BookingsContext from "../context/BookingsContext";

const DashboardTable = () => {
  const [bookingsData] = useContext(BookingsContext);
  const lastFourBookings = bookingsData.slice(-4).reverse();
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Parking Space
            </th>
            <th scope="col" className="px-6 py-3">
              Total Cost
            </th>
          </tr>
        </thead>
        <tbody>
          {lastFourBookings.map((booking) => (
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
              <td className="px-6 py-4">{booking.parking_duration} hr</td>
              <td className="px-6 py-4">{booking.parking_name}</td>
              <td className="px-6 py-4">ksh {booking.total_fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
