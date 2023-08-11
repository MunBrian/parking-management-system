const TimePicker = ({
  setTotalHours,
  totalHours,
  setFromTime,
  fromTime,
  setToTime,
  toTime,
}) => {
  const calculateTotalHours = () => {
    const startTime = new Date(`2000-01-01T${fromTime}`);
    const endTime = new Date(`2000-01-01T${toTime}`);

    let diffInMilliseconds;
    if (endTime >= startTime) {
      diffInMilliseconds = endTime - startTime;
    } else {
      const midnight = new Date(`2000-01-02T00:00:00`);
      diffInMilliseconds =
        midnight - startTime + (endTime - new Date(`2000-01-01T00:00:00`));
    }

    const hours = Math.ceil(diffInMilliseconds / (1000 * 60 * 60));

    setTotalHours(hours);
  };

  return (
    <div className="lg:block space-y-2 py-2 md:flex md:justify-between md:items-center">
      <div className="flex space-x-2">
        <div>
          <label
            htmlFor="fromTime"
            className="block text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            From Time
          </label>
          <div className="mt-1">
            <input
              id="fromTime"
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="toTime"
            className="block text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            To Time
          </label>
          <div className="mt-1">
            <input
              id="toTime"
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={calculateTotalHours}
          className=" text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Calculate
        </button>
      </div>

      {totalHours && (
        <div className="mt-2">
          <span className="text-gray-500 dark:text-gray-400 font-medium text-xs">
            Total hours
          </span>
          <div className="text-xl font-medium text-gray-900 dark:text-white">
            {totalHours}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
