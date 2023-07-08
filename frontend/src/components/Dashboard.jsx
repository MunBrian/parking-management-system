import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import MotoristBarChart from "./MotoristBarChart";
import MotoristDashboardTable from "./MotoristDashboardTable";
import SemiDoughnutChart from "./SemiDoughnutChart";
import Spinner from "./Spinner";

const Dashboard = () => {
  const { userDetails } = useContext(UserContext);

  const { national_id } = userDetails;

  if (!national_id) {
    return <Spinner />;
  }

  return (
    <>
      {!national_id && (
        <div className="p-3 bg-red-500 text-white text-center my-2 rounded-md">
          <Link to="/home/profile">
            <h3 className="text-lg font-semibold dark:text-white underline underline-offset-2">
              To continue, Finish Setting Up Your Profile
            </h3>
          </Link>
        </div>
      )}
      <div className="flex items-start mb-8">
        <h3 className="text-3xl font-bold dark:text-white">Dashboard</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="block max-w-sm p-6 h-44 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
              Total Time Booked
            </h5>
            <p className="text-4xl font-bold text-primary-600">1500 minutes</p>
          </div>
        </div>
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
              Total Money Spent
            </h5>
            <p className="text-4xl font-bold text-primary-600">Ksh 1500</p>
          </div>
        </div>
        <div className="block max-w-sm p-6 h-44 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="text-left">
            <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
              Booking Duration
            </h5>
            <SemiDoughnutChart />
          </div>
        </div>
      </div>
      <div className="grid gap-x-3 grid-cols-2">
        <div className="block p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h5 className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-gray-400">
              Money spent this week
            </h5>
            <MotoristBarChart />
          </div>
        </div>
        <div className="block p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
