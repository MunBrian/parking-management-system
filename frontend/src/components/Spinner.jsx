import React from "react";
import Lottie from "lottie-react";

import LoadingSpinner from "../assets/animations/loading-spinner-dots.json";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-700">
      <Lottie animationData={LoadingSpinner} loop={true} className="w-52" />
    </div>
  );
};

export default Spinner;
