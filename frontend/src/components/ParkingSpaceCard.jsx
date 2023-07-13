import React from "react";

const ParkingSpaceCard = ({ space, handleDelete }) => {
  const handleDeleteClick = (id) => {
    handleDelete(id);
  };

  return (
    <div className="block space-y-4 p-6 h-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {space.parking_name}
      </h2>
      <div className="flex space-x-2">
        <p className="text-lg font-bold text-primary-600">
          {space.parking_city},
        </p>
        <p className="text-lg font-bold text-primary-600">
          {space.parking_street}
        </p>
      </div>
      <p className="text-lg font-bold text-gray-900 dark:text-white">
        {space.parking_slots} Parking Slots
      </p>
      <div>
        <button
          type="submit"
          onClick={() => handleDeleteClick(space.ID)}
          className=" text-white  bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ParkingSpaceCard;
