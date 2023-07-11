import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapPopup from "./MapPopup";
import ParkingContext from "../context/ParkingContext";
import Loading from "./Loading";

const Map = () => {
  const [parkingSpaceData, setParkingSpaceData] = useContext(ParkingContext);

  //fetch all parkings
  const fetchAllParkings = async () => {
    const url = "http://localhost:8000/get-all-parking";

    const response = await fetch(url);

    const data = await response.json();

    if (data.status === 200) {
      setParkingSpaceData(data.parkings);
      console.log(data.parkings);
      return;
    }
  };

  useEffect(() => {
    try {
      //fetch all parking
      fetchAllParkings();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (parkingSpaceData.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex items-start mb-8">
          <h3 className="text-3xl font-bold dark:text-white">
            Choose a Parking Spot
          </h3>
        </div>
        <div className="">
          <div className="h-screen w-full">
            <MapContainer
              center={[-1.2882, 36.8233]}
              zoom={10}
              className="h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/search?query=Nairobi#map=11/-1.3040/36.8774">Open street map</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {parkingSpaceData.map((parking) => (
                <Marker
                  position={[
                    parseFloat(parking.parking_lat),
                    parseFloat(parking.parking_lng),
                  ]}
                >
                  <MapPopup parking={parking} />
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div>Map Card</div>
        </div>
      </div>
    </>
  );
};

export default Map;
