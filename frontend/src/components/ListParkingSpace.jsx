import React from "react";

const ListParkingSpace = () => {
  return (
    <>
      <div className="flex items-start mb-8">
        <h3 className="text-3xl font-bold dark:text-white">
          List Parking Space
        </h3>
      </div>
      <form className="md:space-y-6" action="#">
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
              id="parking_name"
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
              id="parking_slots"
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
              id="parking_slot_initial"
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
              type="text"
              id="parking_charges"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="150"
              required
            />
          </div>
        </div>
        <h3 className="text-xl font-bold dark:text-white">Parking Location</h3>
        <div className="grid md:grid-cols-2 md:gap-6 pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
          <div>
            <label
              for="parking_city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="parking_city"
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
              id="parking_street"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Likoni"
              required
            />
          </div>
        </div>
        <div className="text-end">
          <button
            type="submit"
            className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ListParkingSpace;
