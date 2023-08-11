import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import SideNavContext from "../context/SideNavContext";

const Navbar = () => {
  //get user details from usercontext
  const { userDetails } = useContext(UserContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SideNavContext);

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

  const showSideBar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="top-0 h-20 md:hidden bg-gray-50 dark:bg-gray-900 p-4 w-screen fixed">
      <div className="flex justify-between items-center px-4">
        <button onClick={showSideBar}>
          <svg
            fill="none"
            stroke="currentColor"
            className="w-8 h-8 text-gray-100 transition duration-75 dark:text-gray-100 group-hover:text-white dark:group-hover:text-white"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            ></path>
          </svg>
        </button>

        <Link to={`/home/profile/${userDetails.id}`}>
          <img
            className="w-12 h-12 rounded-full shadow-lg object-cover"
            src={
              !userDetails.profilepic
                ? "/assets/images/empty-profile.png"
                : `data:image/${getImageFormat(
                    userDetails.profilepic
                  )};base64,${userDetails.profilepic}`
            }
            alt="Bonnie image"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
