import React from "react";
import Lottie from "lottie-react";

import Success from "../assets/animations/success.json";

const Sucess = () => {
  return (
    <div>
      <Lottie animationData={Success} loop={false} className="w-52" />
    </div>
  );
};

export default Sucess;
