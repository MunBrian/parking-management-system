import { Link } from "react-router-dom";
import Success from "./Success";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const ParkingSucess = () => {
  const { userDetails } = useContext(UserContext);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-800">
      <h2 className="dark:text-white font-semibold text-2xl">
        Parking Space Listed Successfully
      </h2>
      <Success />
      <Link
        to={`/home/parking-spaces/${userDetails.id}`}
        className="mb-1 text-xl underline font-medium text-gray-900 dark:text-white"
      >
        Check out parking space
      </Link>
    </div>
  );
};

export default ParkingSucess;
