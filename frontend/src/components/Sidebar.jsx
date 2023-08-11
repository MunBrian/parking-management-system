import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import SideNavContext from "../context/SideNavContext";

const Sidebar = () => {
  const navigate = useNavigate();

  //get user details from usercontext
  const { userDetails, setUserDetails } = useContext(UserContext);
  //get showSideNavbar value
  const { sidebarVisible, setSidebarVisible } = useContext(SideNavContext);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    profilepic: "",
    email: "",
    userCategory: "",
  });

  const { firstName, lastName, email, profilepic, userCategory } = userData;

  const handleLogout = () => {
    localStorage.removeItem("user-data");

    setUserDetails({});

    navigate("/login");
  };

  useEffect(() => {
    if (userDetails) {
      const { firstName, lastName, profilepic, email, userCategory } =
        userDetails;

      setUserData({
        firstName: firstName,
        lastName: lastName,
        email: email,
        profilepic: profilepic,
        userCategory: userCategory,
      });
    }
  }, [userDetails]);

  function getImageFormat(imageData) {
    const formats = {
      "/9j/": "jpeg",
      iVBORw0: "png",
      // Add more formats as needed
    };

    for (const [prefix, format] of Object.entries(formats)) {
      if (imageData.startsWith(prefix)) {
        return format;
      }
    }

    return "jpeg"; // Default to JPEG if the format is not recognized
  }

  const closeSideBar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <aside
      id="default-sidebar"
      className={
        sidebarVisible
          ? "block md:block fixed  top-0 left-0 z-40 lg:w-1/5 md:w-2/12 h-screen "
          : "hidden md:block fixed  top-0 left-0 z-40 lg:w-1/5 md:w-2/12 h-screen"
      }
      aria-label="Sidenav"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="text-right w-full flex items-start md:hidden lg:flex justify-end">
          <button onClick={closeSideBar}>
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1.5"
              className="w-8 h-8 text-gray-100 lg:hidden duration-75 dark:text-gray-100 group-hover:text-white dark:group-hover:text-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex flex-col items-center pb-4">
          <Link to={`/home/profile/${userDetails.id}`}>
            <img
              className="hidden md:block w-16 h-16 mb-3 rounded-full shadow-lg object-cover"
              src={
                !profilepic
                  ? "/assets/images/empty-profile.png"
                  : `data:image/${getImageFormat(
                      userDetails.profilepic
                    )};base64,${userDetails.profilepic}`
              }
              alt="Bonnie image"
            />
          </Link>

          <Link
            to={`/home/profile/${userDetails.id}`}
            className="hidden lg:block mb-1 text-xl font-medium text-gray-900 dark:text-white"
          >
            {firstName} {lastName}
          </Link>

          <Link
            to={`/home/profile/${userDetails.id}`}
            className="md:block lg:hidden text-lg font-medium text-gray-900 dark:text-white hover:text-primary-700"
          >
            {firstName}
          </Link>
          <span className="md:hidden lg:block text-md text-gray-500 dark:text-gray-400">
            {email}
          </span>
          <button
            type="button"
            onClick={(e) => handleLogout(e)}
            className="md:hidden lg:flex justify-center items-center mt-4 py-2.5 w-full text-base font-normal text-white bg-primary-600 rounded-lg border border-solid border-gray-400 transition duration-75 group hover:bg-primary-700 dark:text-white dark:hover:bg-primary-700 group-hover:border-none"
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
        <ul className="pt-5 lg:mt-5 mt-0 lg:space-y-2 space-y-6 border-t border-gray-200 dark:border-gray-700">
          <li>
            <Link
              to="/home/dashboard"
              className="flex items-center justify-center lg:justify-start p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:text-white hover:bg-primary-600 focus:bg-primary-700 focus:dark:bg-primary-700 focus:dark:text-white  dark:hover:bg-primary-700 dark:text-white group"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-8 h-8 lg:w-6 lg:h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white dark:group-focus:text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"></path>
              </svg>
              <span className="hidden lg:block lg:ml-3">Dashboard</span>
            </Link>
          </li>
          {userCategory !== "park-owner" ? (
            <>
              <li>
                <Link
                  to="/home/map"
                  className="flex items-center justify-center lg:justify-start p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:text-white hover:bg-primary-600 focus:bg-primary-700 focus:dark:bg-primary-700 focus:dark:text-white  dark:hover:bg-primary-700 dark:text-white group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-8 h-8 lg:w-6 lg:h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white dark:group-focus:text-white"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 18.4853L16.2426 14.2426C18.5858 11.8995 18.5858 8.10051 16.2426 5.75736C13.8995 3.41421 10.1005 3.41421 7.75736 5.75736C5.41421 8.10051 5.41421 11.8995 7.75736 14.2426L12 18.4853ZM17.6569 15.6569L12 21.3137L6.34315 15.6569C3.21895 12.5327 3.21895 7.46734 6.34315 4.34315C9.46734 1.21895 14.5327 1.21895 17.6569 4.34315C20.781 7.46734 20.781 12.5327 17.6569 15.6569ZM5 22H19V24H5V22Z"></path>
                  </svg>
                  <span className="hidden lg:block lg:ml-3">
                    Find Parking Spot
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/home/receipt"
                  className="flex items-center justify-center lg:justify-start p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:text-white hover:bg-primary-600 focus:bg-primary-700 focus:dark:bg-primary-700 focus:dark:text-white  dark:hover:bg-primary-700 dark:text-white group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="flex-shrink-0 w-8 h-8 lg:w-6 lg:h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white dark:group-focus:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z"></path>
                  </svg>
                  <span className="hidden lg:block lg:ml-3">Receipt</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/home/list-parking-space"
                  className="flex items-center justify-center lg:justify-start p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:text-white hover:bg-primary-600 focus:bg-primary-700 focus:dark:bg-primary-700 focus:dark:text-white  dark:hover:bg-primary-700 dark:text-white group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="flex-shrink-0 w-8 h-8 lg:w-6 lg:h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white dark:group-focus:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM11 10V7H13V10H16V12H13V15H11V12H8V10H11Z"></path>
                  </svg>
                  <span className="hidden lg:block lg:ml-3">
                    List Parking Space
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/home/parking-spaces/${userDetails.id}`}
                  className="flex items-center justify-center lg:justify-start p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:text-white hover:bg-primary-600 focus:bg-primary-700 focus:dark:bg-primary-700 focus:dark:text-white  dark:hover:bg-primary-700 dark:text-white group"
                >
                  <svg
                    fill="currentColor"
                    className="flex-shrink-0 w-8 h-8 lg:w-6 lg:h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white dark:group-focus:text-white"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                    ></path>
                  </svg>
                  <span className="hidden lg:block lg:ml-3">Parking Space</span>
                </Link>
              </li>
            </>
          )}

          <li>
            <Link
              to="/home/report"
              className="flex items-center justify-center lg:justify-start p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:text-white hover:bg-primary-600 focus:bg-primary-700 focus:dark:bg-primary-700 focus:dark:text-white  dark:hover:bg-primary-700 dark:text-white group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0 w-8 h-8 lg:w-6 lg:h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white dark:group-focus:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM11 9H13V17H11V9ZM15 12H17V17H15V12ZM7 14H9V17H7V14Z"></path>
              </svg>
              <span className="hidden lg:block lg:ml-3">Report</span>
            </Link>
          </li>

          <li
            className="lg:hidden flex items-center  justify-center lg:justify-start p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:text-white hover:bg-primary-600 focus:bg-primary-700 focus:dark:bg-primary-700 focus:dark:text-white  dark:hover:bg-primary-700 dark:text-white group"
            onClick={(e) => handleLogout(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 md:w-8 md:h-8 lg:w-6 lg:h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white dark:group-focus:text-white"
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
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
