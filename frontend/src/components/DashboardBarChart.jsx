import { useContext } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import BookingsContext from "../context/BookingsContext";

const data = [
  { day: "Monday", spent: 5000 },
  { day: "Tuesday", spent: 8000 },
  { day: "Wednesday", spent: 10000 },
  { day: "Thursday", spent: 7000 },
  { day: "Friday", spent: 6000 },
  { day: "Saturday", spent: 9000 },
  { day: "Sunday", spent: 7500 },
];
const DashboardBarChart = () => {
  const [bookingsData] = useContext(BookingsContext);

  const updatedData = data.map((item) => {
    const matchingBookings = bookingsData.filter((booking) =>
      booking.day.toLowerCase().includes(item.day.toLowerCase())
    );

    const totalFees = matchingBookings.reduce((sum, booking) => {
      const fee = parseFloat(booking.total_fees);
      return isNaN(fee) ? sum : sum + fee;
    }, 0);

    return {
      ...item,
      spent: isNaN(totalFees) ? 0 : totalFees,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={updatedData}
        margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
      >
        <XAxis dataKey="day" />
        <YAxis dataKey="spent" />
        <Tooltip />
        <Legend />
        <Bar dataKey="spent" fill="#7c3aed" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;
