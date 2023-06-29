import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Sidebar = () => {
  const navigate = useNavigate();

  //get user details from usercontext
  const { userDetails, setUserDetails } = useContext(UserContext);

  const { firstName, lastName, email, profilepic, userCategory } = userDetails;

  const handleLogout = () => {
    localStorage.removeItem("user-data");

    setUserDetails({});

    navigate("/login");
  };

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-1/5 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidenav"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-4">
          <img
            className="w-16 h-16 mb-3 rounded-full shadow-lg"
            src="/assets/images/empty-profile.png"
            alt="Bonnie image"
          />
          <Link
            to="/home/profile"
            className="mb-1 text-xl font-medium text-gray-900 dark:text-white"
          >
            {firstName} {lastName}
          </Link>
          <span className="text-md text-gray-500 dark:text-gray-400">
            {email}
          </span>
          <button
            type="button"
            onClick={(e) => handleLogout(e)}
            className="flex justify-center items-center mt-4 py-2.5 w-full text-base font-normal text-white bg-primary-600 rounded-lg border border-solid border-gray-400 transition duration-75 group hover:bg-primary-700 dark:text-white dark:hover:bg-primary-700 group-hover:border-none"
            aria-controls="dropdown-pages"
            data-collapse-toggle="dropdown-pages"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-100 transition duration-75 dark:text-gray-100 group-hover:text-white dark:group-hover:text-white"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span className="ml-3 whitespace-nowrap">Logout</span>
          </button>
        </div>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <Link
              to="/home/dashboard"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:text-white hover:bg-primary-600 focus:bg-primary-700 focus:dark:bg-primary-700 focus:dark:text-white  dark:hover:bg-primary-700 dark:text-white group"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white dark:group-focus:text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          {userCategory !== "park-owner" ? (
            <>
              <li>
                <Link
                  to="/home/map"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-primary-600 dark:hover:bg-primary-700 dark:text-white focus:dark:bg-primary-700 focus:dark:text-white group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white dark:group-focus:text-white"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 18.4853L16.2426 14.2426C18.5858 11.8995 18.5858 8.10051 16.2426 5.75736C13.8995 3.41421 10.1005 3.41421 7.75736 5.75736C5.41421 8.10051 5.41421 11.8995 7.75736 14.2426L12 18.4853ZM17.6569 15.6569L12 21.3137L6.34315 15.6569C3.21895 12.5327 3.21895 7.46734 6.34315 4.34315C9.46734 1.21895 14.5327 1.21895 17.6569 4.34315C20.781 7.46734 20.781 12.5327 17.6569 15.6569ZM5 22H19V24H5V22Z"></path>
                  </svg>
                  <span className="ml-3">Find Parking Spot</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/home/add-parking-space"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-primary-700 dark:text-white focus:dark:bg-primary-700 group "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM11 10V7H13V10H16V12H13V15H11V12H8V10H11Z"></path>
                  </svg>
                  <span className="ml-3">List Parking Space</span>
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              to="/home/receipt"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-primary-700 dark:text-white focus:dark:bg-primary-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z"></path>
              </svg>
              <span className="ml-3">Receipt</span>
            </Link>
          </li>
          <li>
            <Link
              to="/home/report"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-primary-700 dark:text-white focus:dark:bg-primary-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white dark:group-focus:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM11 9H13V17H11V9ZM15 12H17V17H15V12ZM7 14H9V17H7V14Z"></path>
              </svg>
              <span className="ml-3">Report</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
