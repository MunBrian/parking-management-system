import React from "react";
import Lottie from "lottie-react";

import SuccessAnimation from "../assets/animations/success.json";

const Success = () => {
  return (
    <div>
      <Lottie animationData={SuccessAnimation} loop={false} className="w-52" />
    </div>
  );
};

export default Success;
