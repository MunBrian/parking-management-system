import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

import Failed from "../assets/animations/payment-failed.json";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-800">
      <h2 className="dark:text-white font-semibold text-2xl">
        Payment Failed!!
      </h2>
      <Lottie animationData={Failed} loop={true} className="w-72" />
      <Link
        to="/home/map"
        className="mb-1 text-xl underline font-medium text-gray-900 dark:text-white"
      >
        Go back
      </Link>
    </div>
  );
};

export default PaymentFailed;
