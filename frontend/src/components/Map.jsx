import { useContext, useLayoutEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapPopup from "./MapPopup";
import ParkingContext from "../context/ParkingContext";
import Loading from "./Loading";
import { Icon } from "leaflet";

const Map = () => {
  const [parkingSpaceData, setParkingSpaceData] = useContext(ParkingContext);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  //fetch all parkings
  const fetchAllParkings = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/get-all-parking`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.status === 200) {
      setParkingSpaceData(data.parkings);
      return;
    }
  };

  useLayoutEffect(() => {
    try {
      //fetch all parking
      fetchAllParkings();
    } catch (error) {
      console.log(error);
    }

    if (navigator.geolocation) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      // Geolocation is not supported by this browser
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  if (parkingSpaceData.length === 0) {
    return <Loading />;
  }

  function showPosition(position) {
    // Latitude and Longitude values
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    setUserLatitude(latitude);
    setUserLongitude(longitude);
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
        console.log("An error occurred.");
        break;
    }
  }

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3005/3005366.png",
    iconSize: [42, 42],
  });

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex items-start mb-8">
          <h3 className="text-3xl font-bold dark:text-white">
            Choose a Parking Spot
          </h3>
        </div>
        <div className="relative md:-z-0 z-10">
          <div className="h-screen">
            <MapContainer
              center={
                // userLatitude
                [-1.2882, 36.8233]
              }
              zoom={10}
              className="h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/search?query=Nairobi#map=11/-1.3040/36.8774">Open street map</a> Nairobi'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {parkingSpaceData.map((parking) => (
                <Marker
                  key={parking.id}
                  position={[
                    parseFloat(parking.parking_lat),
                    parseFloat(parking.parking_lng),
                  ]}
                  icon={customIcon}
                >
                  <MapPopup key={parking.id} parking={parking} />
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
