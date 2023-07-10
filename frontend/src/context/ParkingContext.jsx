import { createContext, useState } from "react";

const ParkingContext = createContext();

export const ParkingProvider = ({ children }) => {
  const [parkingSpaceData, setParkingSpaceData] = useState([]);

  return (
    <ParkingContext.Provider value={[parkingSpaceData, setParkingSpaceData]}>
      {children}
    </ParkingContext.Provider>
  );
};

export default ParkingContext;
