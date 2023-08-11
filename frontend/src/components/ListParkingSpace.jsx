import { useState, useContext, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";
import { Icon } from "leaflet";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ListParkingSpace = () => {
  const navigate = useNavigate();

  const [parkingDetails, setParkingDetails] = useState({});
  const { userDetails } = useContext(UserContext);

  const [spinner, setSpinner] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [parkingImages, setParkingImages] = useState([]);

  const [formData, setFormData] = useState({
    owner_id: "",
    parking_name: "",
    parking_slots: null,
    parking_initial: "",
    parking_fee: null,
    parking_city: "",
    parking_street: "",
    parking_image_1: null,
    parking_image_2: null,
    parking_lat: null,
    parking_lng: null,
  });

  const {
    parking_name,
    parking_slots,
    parking_initial,
    parking_fee,
    parking_city,
    parking_street,
  } = formData;

  const maxImages = 2;

  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImages = [];

    // Validate number of images
    if (files.length !== maxImages) {
      //send success message
      toast.error(`Please select a maximum of ${maxImages} images`, {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }

    // Convert FileList to Array
    const fileList = Array.from(files);

    // Iterate through selected files
    fileList.forEach((file) => {
      selectedImages.push(file);
    });

    // Update parkingImages state
    setParkingImages(selectedImages);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (parkingImages.length === 0) {
      //send success message
      toast.error("Please choose parking images", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }
    setParkingDetails({
      ...formData,
      parking_image_1: parkingImages[0],
      parking_image_2: parkingImages[1],
    });
  };

  const fetchInitialPosition = async () => {
    try {
      const streetName = parkingDetails.parking_street;
      const city = parkingDetails.parking_city;
      const placeName = `${streetName},${city}`;

      const apiKey = "ca40323719a6443883c1c6268a2c82a5";
      const geocodingEndpoint = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        placeName
      )}&key=${apiKey}`;

      const response = await fetch(geocodingEndpoint);
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLatitude(lat);
        setLongitude(lng);
      } else {
        setLatitude(null);
        setLongitude(null);
      }
    } catch (error) {
      console.error("Error geocoding place:", error);
      setLatitude(null);
      setLongitude(null);
    }
  };

  useEffect(() => {
    if (Object.keys(parkingDetails).length > 0) {
      fetchInitialPosition();
    }
  }, [parkingDetails]);

  const handleMarkerDrag = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleListParking = async (e) => {
    e.preventDefault();

    setSpinner(true);

    const url = `${import.meta.env.VITE_SERVER_URL}/create-parking-space`;

    const formData = new FormData();

    formData.append("owner_id", userDetails.id);
    formData.append("parking_name", parkingDetails.parking_name);
    formData.append("parking_initial", parkingDetails.parking_initial);
    formData.append("parking_city", parkingDetails.parking_city);
    formData.append("parking_street", parkingDetails.parking_street);
    formData.append("parking_slots", parkingDetails.parking_slots);
    formData.append("parking_image_1", parkingDetails.parking_image_1);
    formData.append("parking_image_2", parkingDetails.parking_image_2);
    formData.append("parking_fee", parkingDetails.parking_fee);
    formData.append("parking_lat", latitude);
    formData.append("parking_lng", longitude);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.status === 200) {
      setSpinner(false);

      navigate("/home/parking-success");
    }
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3005/3005366.png",
    iconSize: [42, 42],
  });

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(parkingDetails).length > 0 ? (
            <>
              {!latitude ? (
                <Spinner />
              ) : (
                <div className="overflow-x-auto">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      {/* <h3 className="text-xl font-bold dark:text-white py-2">
                        Is the pin in the right place?
                      </h3> */}
                      <span className="dark:text-white">
                        Please drag the pin to the precise location on the map.
                      </span>
                    </div>
                    <div>
                      <button
                        type="submit"
                        onClick={handleListParking}
                        className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="">
                    <div className="h-screen w-full">
                      <MapContainer
                        center={[latitude, longitude]}
                        zoom={15}
                        className="h-screen"
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/search?query=Nairobi#map=11/-1.3040/36.8774">Open street map</a>'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                          position={[latitude, longitude]}
                          draggable={true}
                          eventHandlers={{ dragend: handleMarkerDrag }}
                          key="draggable-marker"
                          icon={customIcon}
                        />
                      </MapContainer>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-start mb-8">
                <h3 className="text-3xl font-bold dark:text-white">
                  List Parking Space
                </h3>
              </div>
              <form
                className="md:space-y-6"
                action="#"
                onSubmit={handleFormSubmit}
              >
                <h3 className="text-xl font-bold dark:text-white">
                  Parking Information
                </h3>
                <div class="grid md:grid-cols-2 md:gap-6 py-5 mt-5 border-t  border-gray-200 dark:border-gray-700">
                  <div>
                    <label
                      for="parking_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Parking Space Name
                    </label>
                    <input
                      type="text"
                      name="parking_name"
                      value={parking_name}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="eg Likoni parking space"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="parking_slots"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      How many parking slots are available?
                    </label>
                    <input
                      type="number"
                      name="parking_slots"
                      value={parking_slots}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="5"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="parking_slot_initial"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Parking Slot Initial
                    </label>
                    <input
                      type="text"
                      name="parking_initial"
                      value={parking_initial}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. LM"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="parking_charges"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Parking fees per hour in (ksh)
                    </label>
                    <input
                      type="number"
                      name="parking_fee"
                      value={parking_fee}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="150"
                      required
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold dark:text-white">
                  Parking Location
                </h3>
                <div className="grid md:grid-cols-2 md:gap-6 py-5 mt-5 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label
                      for="parking_city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="parking_city"
                      value={parking_city}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Mombasa"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="parking_street"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Street
                    </label>
                    <input
                      type="text"
                      name="parking_street"
                      value={parking_street}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Likoni"
                      required
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold dark:text-white">
                  Parking Space Image
                </h3>
                <div className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    A maximum of 2 parking space photo is allowed.
                  </label>
                  {/* <input
            class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-primary-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          ></input> */}

                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                        onChange={handleImageChange}
                        multiple
                      />
                    </label>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ListParkingSpace;

//export default ListParkingSpace;
