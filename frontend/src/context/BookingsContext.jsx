import { createContext, useState } from "react";

const BookingsContext = createContext();

export const BookingsProvider = ({ children }) => {
  const [bookingsData, setBookingsData] = useState([]);

  return (
    <BookingsContext.Provider value={[bookingsData, setBookingsData]}>
      {children}
    </BookingsContext.Provider>
  );
};

export default BookingsContext;
