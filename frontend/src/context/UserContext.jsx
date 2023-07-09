import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});

  const [vehicleDetails, setVehicleDetails] = useState({});

  return (
    <UserContext.Provider
      value={{ setUserDetails, userDetails, vehicleDetails, setVehicleDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
