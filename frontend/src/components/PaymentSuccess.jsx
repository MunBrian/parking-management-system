import React from "react";
import { useParams, Link } from "react-router-dom";
import Success from "./Success";

const PaymentSuccess = () => {
  const param = useParams();

  console.log(param.id);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-800">
      <h2 className="dark:text-white font-semibold text-2xl">
        Payment was Successful
      </h2>
      <Success />
      <Link
        to={`/home/receipt?paramValue=${param.id}`}
        className="mb-1 text-xl underline font-medium text-gray-900 dark:text-white"
      >
        Check Receipt
      </Link>
    </div>
  );
};

export default PaymentSuccess;
