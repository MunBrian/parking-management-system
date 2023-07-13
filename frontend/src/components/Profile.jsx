import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

const Profile = () => {
  const param = useParams();

  const { userDetails, setUserDetails, setVehicleDetails, vehicleDetails } =
    useContext(UserContext);

  const [active, setActive] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [vehicleAdd, setVehicleAdd] = useState(false);
  //state with initial value as user details
  const [formData, setFormData] = useState({
    First_name: "",
    Last_name: "",
    Email: "",
    Phonenumber: "",
    Nationalid: "",
    Profilepic: null,
  });

  const { First_name, Last_name, Email, Phonenumber, Nationalid } = formData;

  const [vehicleData, setVehicleData] = useState({
    Id: userDetails.id,
    vehicleModel: "",
    vehiclePlate: "",
  });

  const { vehicleModel, vehiclePlate, userId } = vehicleData;

  //get profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    //activate save button
    setActive(true);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    //activate save button
    setActive(true);
  };

  const handleVehicleChange = (e) => {
    setVehicleData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    //activate save button
    setActive(true);
  };

  const handleVehicleUpdate = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/update-vehicle";

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    });

    const data = await response.json();

    if (data.status === 200) {
      setTimeout(() => {
        //reload windows
        window.location.reload();
      }, 3000);

      //send success message
      toast.success("Profile updated successfully", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }
  };

  const handleVehicleCreate = async (e) => {
    console.log(vehicleData);
    e.preventDefault();

    const url = "http://localhost:8000/create-vehicle";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    });

    const data = await response.json();

    if (data.status === 200) {
      setTimeout(() => {
        //reload windows
        window.location.reload();
      }, 3000);

      //send success message
      toast.success("Profile updated successfully", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/update-profile";

    const formData = new FormData();
    formData.append("First_name", First_name);
    formData.append("Last_name", Last_name);
    formData.append("Email", Email);
    formData.append("Phonenumber", Phonenumber);
    formData.append("Nationalid", Nationalid);
    formData.append("ID", param.id);
    formData.append("Profilepic", selectedFile);

    console.log(formData);
    const response = await fetch(url, {
      method: "PATCH",
      body: formData,
    });

    const data = await response.json();

    //if ok
    if (data.status === 200) {
      setTimeout(() => {
        //reload windows
        window.location.reload();
      }, 3000);

      //send success message
      toast.success("Profile updated successfully", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      //update user details
      setUserDetails(data.user);

      return;
    }

    console.log({ ...formData, Profilepic: selectedFile });
  };

  //fetch user's vehicle details
  const fetchVehicleDetails = async (id) => {
    try {
      const url = `http://localhost:8000/get-vehicle/${id}`;

      const response = await fetch(url);

      const data = await response.json();

      if (data.status === 200) {
        setVehicleDetails(data.vehicle);

        setVehicleData({
          Id: data.vehicle.ID,
          vehicleModel: data.vehicle.vehicle_model,
          vehiclePlate: data.vehicle.vehicle_plate,
        });
        return;
      }

      setVehicleAdd(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userDetails) {
      const { firstName, lastName, email, phone_number, national_id } =
        userDetails;

      setFormData({
        First_name: firstName,
        Last_name: lastName,
        Email: email,
        Phonenumber: phone_number,
        Nationalid: national_id,
        Profilepic: null,
      });
    }

    //if user is available & user is a motorist
    if (userDetails && userDetails.userCategory === "motorist") {
      fetchVehicleDetails(userDetails.id);
    }
  }, [userDetails]);

  //check image format
  function getImageFormat(imageData) {
    const formats = {
      "/9j/": "jpeg",
      iVBORw0: "png",
    };

    for (const [prefix, format] of Object.entries(formats)) {
      if (imageData.startsWith(prefix)) {
        return format;
      }
    }

    return "jpeg"; // Default to JPEG if the format is not recognized
  }

  // if (
  //   userDetails.userCategory === "motorist" &&
  //   Object.keys(vehicleDetails).length === 0
  // ) {
  //   return <Loading />;
  // }

  console.log(userDetails.id);
  console.log(vehicleData);
  return (
    <>
      <div className="flex items-start mb-8">
        <h3 className="text-3xl font-bold dark:text-white">User Profile</h3>
      </div>
      <form className="md:space-y-5" action="#" onSubmit={handleUserUpdate}>
        <div className="flex text-center space-x-5 items-center">
          <img
            className="w-24 h-24 rounded-full shadow-lg object-cover"
            src={
              !userDetails.profilepic
                ? "/assets/images/empty-profile.png"
                : `data:image/${getImageFormat(
                    userDetails.profilepic
                  )};base64,${userDetails.profilepic}`
            }
            alt="Bonnie image"
          />
          <h2
            to="/home/profile"
            className="mb-1 text-3xl font-medium text-gray-900 dark:text-white"
          >
            {userDetails.firstName} {userDetails.lastName}
          </h2>
        </div>
        <div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Choose photo
            </label>
            <input
              class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-primary-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              onChange={handleFileChange}
              type="file"
            ></input>
          </div>
        </div>
        <h3 className="text-xl font-bold dark:text-white">Personal Details</h3>
        <div className="grid md:grid-cols-2 md:gap-6 py-5 mt-5 border-t  border-gray-200 dark:border-gray-700">
          <div>
            <label
              for="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              value={First_name}
              onChange={handleChange}
              name="First_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label
              for="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              value={Last_name}
              onChange={handleChange}
              name="Last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required
            />
          </div>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              value={Email}
              onChange={handleChange}
              name="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@email.com"
              required
            />
          </div>
          <div>
            <label
              for="national_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              National ID
            </label>
            <input
              type="text"
              name="Nationalid"
              value={Nationalid}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g. 38696406"
              required
            />
          </div>
          <div>
            <label
              for="phone_number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phonenumber
            </label>
            <input
              type="text"
              value={Phonenumber}
              onChange={handleChange}
              name="Phonenumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="+254712345678"
              required
            />
          </div>
        </div>
        <div className="text-end">
          {active ? (
            <button
              type="submit"
              className=" text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Save
            </button>
          ) : (
            <button
              type="submit"
              className=" text-white cursor-not-allowed bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-400"
              disabled
            >
              Save
            </button>
          )}
        </div>
      </form>
      {userDetails.userCategory !== "park-owner" && (
        <>
          {vehicleAdd ? (
            <>
              <h3 className="text-xl font-bold dark:text-white">
                Vehicle Details
              </h3>
              <form action="" onSubmit={handleVehicleCreate}>
                <div className="grid md:grid-cols-2 md:gap-6 pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label
                      for="car_model"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={vehicleModel}
                      onChange={handleVehicleChange}
                      id="car_model"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. Mazda Demio"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="number_plate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vehicle Number Plate
                    </label>
                    <input
                      type="text"
                      name="vehiclePlate"
                      value={vehiclePlate}
                      onChange={handleVehicleChange}
                      id="number_plate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. KAA 100Z"
                      required
                    />
                  </div>
                </div>
                <div className="text-end mt-4">
                  {active ? (
                    <button
                      type="submit"
                      className=" text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className=" text-white cursor-not-allowed bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-400"
                      disabled
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold dark:text-white">
                Vehicle Details
              </h3>
              <form action="" onSubmit={handleVehicleUpdate}>
                <div className="grid md:grid-cols-2 md:gap-6 pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <label
                      for="car_model"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={vehicleModel}
                      onChange={handleVehicleChange}
                      id="car_model"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. Mazda Demio"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="number_plate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vehicle Number Plate
                    </label>
                    <input
                      type="text"
                      name="vehiclePlate"
                      value={vehiclePlate}
                      onChange={handleVehicleChange}
                      id="number_plate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. KAA 100Z"
                      required
                    />
                  </div>
                </div>
                <div className="text-end mt-4">
                  {active ? (
                    <button
                      type="submit"
                      className=" text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className=" text-white cursor-not-allowed bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-400"
                      disabled
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
