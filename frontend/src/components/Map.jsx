import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapPopup from "./MapPopup";
import ParkingContext from "../context/ParkingContext";
import Loading from "./Loading";

const Map = () => {
  const [parkingSpaceData, setParkingSpaceData] = useContext(ParkingContext);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
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

  if (navigator.geolocation) {
    // Geolocation is supported
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    // Geolocation is not supported by this browser
    console.log("Geolocation is not supported by this browser.");
  }

  function showPosition(position) {
    // Latitude and Longitude values
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    setUserLatitude(latitude);
    setUserLongitude(longitude);

    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }

  console.log(userLatitude, userLongitude);

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
              center={
                userLatitude
                  ? [userLatitude, userLongitude]
                  : [-1.2882, 36.8233]
              }
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
