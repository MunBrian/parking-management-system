import { useEffect, useContext, useState } from "react";
import ParkingContext from "../context/ParkingContext";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
const ParkingSpaces = () => {
  const param = useParams();
  const [parkingSpaceData, setParkingSpaceData] = useContext(ParkingContext);
  const [isLoading, setIsLoading] = useState(false);
  //fetch users parking spaces
  const fetchParkingSpace = async (id) => {
    const parkingSpaces = [];
    setIsLoading(true);
    const url = `http://localhost:8000/get-parking-spaces/${id}`;

    const response = await fetch(url);

    const data = await response.json();

    // const dataArray = Array.from(data);

    // dataArray.forEach((data) => {
    //   parkingSpaces.push(data);
    // });

    setParkingSpaceData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      fetchParkingSpace(param.id);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  console.log(parkingSpaceData);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {parkingSpaceData.length > 0 ? (
            <div className="h-screen">
              {parkingSpaceData.map((space) => {
                <div key={space.ID}>
                  <h1 className="dark:text-white">{space.parking_name}</h1>
                </div>;
              })}
            </div>
          ) : (
            <>
              <h1 className="dark:text-white">No parking space available</h1>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ParkingSpaces;
