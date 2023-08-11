import { useLayoutEffect, useContext, useState } from "react";
import ParkingSpot from "./ParkingSpot";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";
import UserContext from "../context/UserContext";
import TimePicker from "./TimePicker";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

import "react-toastify/dist/ReactToastify.css";

const Book = () => {
  const param = useParams();
  const navigate = useNavigate();

  const { userDetails } = useContext(UserContext);

  const [parkingSpaceData, setParkingSpaceData] = useState({});
  const [vehicleData, setVehicleData] = useState({});
  const [parkingSlot, setParkingSlot] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [totalHours, setTotalHours] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [spinner, setSpinner] = useState(false);

  //fetch parking
  const fetchParkingSpace = async (id) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/get-parking/${id}`;
    const response = await fetch(url);

    const data = await response.json();

    if (data.status === 200) {
      setParkingSpaceData(data.parking);
      return;
    }
  };

  //fetch user's vehicle details
  const fetchVehicleDetails = async (id) => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/get-vehicle/${id}`;

      const response = await fetch(url);

      const data = await response.json();

      if (data.status === 200) {
        setVehicleData(data.vehicle);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get parking slot number
  const handleParkingSlot = (slot) => {
    setParkingSlot(slot);
  };

  //get total charges
  let totalFees = parkingSpaceData.parking_fee * totalHours;

  //parkingAddress
  const parkingAdress =
    parkingSpaceData.parking_street + ", " + parkingSpaceData.parking_city;

  //get dates
  const currentDate = new Date();

  //define formattedDate
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //define day
  const currentDay = currentDate.toLocaleDateString(undefined, {
    weekday: "long",
  });

  //fetch all bookings
  const fetchAllBookings = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/get-all-bookings`;

    const response = await fetch(url);

    const data = await response.json();

    setBookings(data.bookings);
  };

  //handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!totalHours) {
      //send error message
      toast.error("Pick and calculate time to continue", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }

    if (!parkingSlot) {
      //send success message
      toast.error("Choose parking slot", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }

    if (Object.keys(vehicleData).length === 0) {
      //send success message
      toast.error("Please finish setting up your profile", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }

    if (userDetails.national_id === "") {
      //send success message
      toast.error("Please finish setting up your profile", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }

    //check if motorist parking slot time has already been booked
    const overlappingBooking = bookings.find((booking) => {
      const bookingFromTime = new Date(`January 1, 2023 ${booking.from_time}`);
      const bookingToTime = new Date(`January 1, 2023 ${booking.to_time}`);
      const selectedFromTime = new Date(`January 1, 2023 ${fromTime}`);
      const selectedToTime = new Date(`January 1, 2023 ${toTime}`);
      return (
        booking.date === formattedDate &&
        booking.parking_slot === parkingSlot &&
        (selectedFromTime <= bookingFromTime <= selectedToTime ||
          selectedFromTime <= bookingToTime <= selectedToTime)
      );
    });

    if (overlappingBooking) {
      //send success message
      toast.error(
        "Parking Slot unavailable between the picked time. Please choose different times, or try another slot",
        {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
        }
      );
      return;
    }

    setSpinner(true);

    const bookingurl = `${import.meta.env.VITE_SERVER_URL}/book-parking-space`;
    const stkurl = `${import.meta.env.VITE_SERVER_URL}/send-stkpush`;

    const formData = new FormData();
    formData.append("date", formattedDate);
    formData.append("day", currentDay);
    formData.append("parking_id", parkingSpaceData.ID);
    formData.append("motorist_id", userDetails.id);
    formData.append("parking_name", parkingSpaceData.parking_name);
    formData.append("parking_address", parkingSpaceData.parking_street);
    formData.append("parking_slot", parkingSlot);
    formData.append("motorist_name", userDetails.firstName);
    formData.append("motorist_phonenumber", userDetails.phone_number);
    formData.append("vehicle_model", vehicleData.vehicle_model);
    formData.append("vehicle_plate", vehicleData.vehicle_plate);
    formData.append("to_time", toTime);
    formData.append("from_time", fromTime);
    formData.append("parking_duration", totalHours);
    formData.append("total_fees", totalFees);

    try {
      //send stkpush request attach phonenumber and amount
      const stkresponse = await fetch(stkurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motorist_phonenumber: String(userDetails.phone_number),
          amount: String(totalFees),
        }),
      });

      const stkdata = await stkresponse.json();

      //if stkpush is sent successfully
      if (stkdata.status === 200) {
        //send booking details
        const bookingResponse = await fetch(bookingurl, {
          method: "POST",
          body: formData,
        });

        const bookingData = await bookingResponse.json();

        //if booking request is successful
        if (bookingData.status === 200) {
          setTimeout(() => {
            navigate(`/home/payment-success/${bookingData.booking.ID}`);
          }, 4000);

          setTimeout(() => {
            setSpinner(false);
          }, 3000);
        } else {
          //hidden the spinner
          setSpinner(false);

          //navigate to the payment-failed page
          navigate("/home/payment-failed");
        }
      } else {
        //hidden the spinner
        setSpinner(false);

        //navigate to the payment-failed page
        navigate("/home/payment-failed");
      }
    } catch (error) {
      //console.log err
      console.log(error);
      //navigate to the payment-failed page
      navigate("/home/payment-failed");
    }
  };

  useLayoutEffect(() => {
    //fetch parking
    fetchParkingSpace(param.id);

    if (Object.keys(userDetails).length > 0) {
      //fetch vehicle
      fetchVehicleDetails(userDetails.id);
    }

    //fetchallbookings
    fetchAllBookings();
  }, []);

  if (
    Object.keys(parkingSpaceData).length === 0 &&
    Object.keys(vehicleData).length === 0
  ) {
    return <Loading />;
  }

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          {(Object.keys(vehicleData).length === 0 ||
            userDetails.national_id === "") && (
            <div className="p-3 bg-red-500 text-white text-center my-2 rounded-md">
              <Link to={`/home/profile/${userDetails.id}`}>
                <h3 className="text-lg font-semibold dark:text-white underline underline-offset-2">
                  To continue, Finish Setting Up Your Profile
                </h3>
              </Link>
            </div>
          )}
          <div className="flex items-start mb-8">
            <h3 className="text-3xl font-bold dark:text-white">
              Book Parking Space
            </h3>
          </div>
          <div className="lg:grid lg:gap-x-2 lg:grid-cols-3 md:block">
            <div className="col-span-2 block p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-xl font-semibold dark:text-gray-200">
                Pick a Parking Slot
              </h3>
              <div className="grid gap-x-2 grid-cols-2 mt-3">
                {Array.from({ length: parkingSpaceData.parking_slots }).map(
                  (_, index) => (
                    <ParkingSpot
                      key={index}
                      handleParkingSlot={handleParkingSlot}
                      parkingNumber={index}
                      parkingInitial={parkingSpaceData.parking_initial}
                    />
                  )
                )}
              </div>
            </div>
            <div className="block p-4 mt-4 lg:mt-0 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-xl font-semibold dark:text-gray-200">
                Booking Details
              </h3>
              <div className="lg:flex lg:flex-col md:grid md:grid-cols-2 space-y-5 mt-5 border-t border-gray-700 dark:border-gray-200 p-5">
                <div className="block text-left md:mt-5 lg:mt-0">
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                    Parking Name
                  </span>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    {parkingSpaceData.parking_name}
                  </div>
                </div>
                <div className="block text-left">
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                    Parking address
                  </span>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    {parkingAdress}
                  </div>
                </div>
                <div className="block text-left">
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                    Parking Slot:
                  </span>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    {parkingSlot}
                  </div>
                </div>
                <div className="block text-left">
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                    Motorist Name
                  </span>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    {userDetails.firstName} {userDetails.lastName}
                  </div>
                </div>
                <div className="block text-left">
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                    Mobile Number
                  </span>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    {userDetails.phone_number}
                  </div>
                </div>
                <div className="block text-left">
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                    vehicle model
                  </span>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    {vehicleData.vehicle_model}
                  </div>
                </div>
                <div className="block text-left">
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                    vehicle No plate
                  </span>
                  <div className="text-xl font-medium text-gray-900 dark:text-white">
                    {vehicleData.vehicle_plate}
                  </div>
                </div>
                <div className="block text-left md:col-span-2">
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                    Pick Time
                  </span>
                  <TimePicker
                    setTotalHours={setTotalHours}
                    totalHours={totalHours}
                    fromTime={fromTime}
                    setFromTime={setFromTime}
                    toTime={toTime}
                    setToTime={setToTime}
                  />
                </div>
                <div className="block text-left">
                  <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
                    Total
                  </span>
                  <div className="text-2xl font-medium text-gray-900 dark:text-white">
                    {totalFees}
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleBookingSubmit}
                  className="flex justify-center items-center mt-4 py-2.5 w-full text-base font-normal text-white bg-primary-600 rounded-lg border border-solid border-gray-400 transition duration-75 group hover:bg-primary-700 dark:text-white dark:hover:bg-primary-700 group-hover:border-none"
                  aria-controls="dropdown-pages"
                  data-collapse-toggle="dropdown-pages"
                >
                  <svg
                    fill="none"
                    className="w-6 h-6 text-gray-100 transition duration-75 dark:text-gray-100 group-hover:text-white dark:group-hover:text-white"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                    ></path>
                  </svg>
                  <span className="ml-3 whitespace-nowrap text-md font-medium">
                    Pay
                  </span>
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </>
      )}
    </>
  );
};

export default Book;
