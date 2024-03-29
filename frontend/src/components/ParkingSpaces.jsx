import { useLayoutEffect, useContext, useState } from "react";
import ParkingContext from "../context/ParkingContext";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./Loading";
import ParkingSpaceCard from "./ParkingSpaceCard";
import Lottie from "lottie-react";

import "react-toastify/dist/ReactToastify.css";

import Unavailable from "../assets/animations/not-available.json";

const ParkingSpaces = () => {
  const param = useParams();
  const [parkingSpaceData, setParkingSpaceData] = useContext(ParkingContext);
  const [isLoading, setIsLoading] = useState(false);

  //fetch users parking spaces
  const fetchParkingSpace = async (id) => {
    setIsLoading(true);
    const url = `${import.meta.env.VITE_SERVER_URL}/get-parking-spaces/${id}`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.status === 200) {
      const parkingSpaces = [];

      let parkingData = Array.from(data.parking_data);

      parkingData.forEach((parking) => {
        parkingSpaces.push(parking);
      });

      setParkingSpaceData(parkingSpaces);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  useLayoutEffect(() => {
    try {
      fetchParkingSpace(param.id);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  //delete parking space
  const deleteParkingSpace = async (id) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/delete-parking/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();

    //if ok
    if (data.status === 200) {
      setTimeout(() => {
        //reload windows
        window.location.reload();
      }, 3000);

      //send success message
      toast.success("Parking Space deleted successfully", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete parking space")) {
      try {
        //delete parking space
        deleteParkingSpace(id);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {parkingSpaceData.length > 0 ? (
            <>
              <h3 className="text-3xl font-bold dark:text-white">
                Parking Spaces
              </h3>
              <div className="block md:grid md:grid-cols-2 md:gap-2 my-4 space-y-3 md:space-y-0 md:my-8">
                {parkingSpaceData.map((space) => (
                  <ParkingSpaceCard
                    key={space.ID}
                    space={space}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800">
              <h3 className="text-3xl font-bold dark:text-white">
                No Parking Space Available
              </h3>

              <Lottie
                animationData={Unavailable}
                loop={true}
                className="w-52"
              />

              <Link
                to="/home/list-parking-space"
                className="mb-1 text-xl underline font-medium text-gray-900 dark:text-white hover:text-primary-600"
              >
                List Parking Space
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ParkingSpaces;
