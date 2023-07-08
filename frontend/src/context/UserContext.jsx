import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});

  return (
    <UserContext.Provider value={{ setUserDetails, userDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
