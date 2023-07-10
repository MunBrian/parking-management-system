import React from "react";
import Lottie from "lottie-react";

import CircularSpinner from "../assets/animations/circular-spinner.json";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-700">
      <Lottie animationData={CircularSpinner} loop={true} className="w-52" />
    </div>
  );
};

export default Spinner;
