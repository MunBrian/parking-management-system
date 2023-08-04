import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  //get token from param
  const { token } = useParams();
  const navigate = useNavigate();

  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordLenghtErr, setpasswordLengthErr] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    confirm_password: "",
  });

  const { password, confirm_password } = passwords;

  const handleChange = (e) => {
    setPasswords((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setpasswordLengthErr(false);
    setPasswordErr(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    //check password length
    if (password.length < 6) {
      setpasswordLengthErr(true);
    }

    //check password matching
    if (password !== confirm_password) {
      setPasswordErr(true);
      return;
    }

    //decode token from param
    function urlBase64Decode(str) {
      // Convert '-' and '_' to '+' and '/' respectively
      const decodedStr = str.replace(/-/g, "+").replace(/_/g, "/");
      // Pad the string if its length is not a multiple of 4
      const paddedStr =
        decodedStr + "==".substring(0, (4 - (decodedStr.length % 4)) % 4);
      // Decode the base64-encoded string
      return atob(paddedStr);
    }

    const decodedToken = urlBase64Decode(token);

    //send request
    const url = `${import.meta.env.VITE_SERVER_URL}/reset-password`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${decodedToken}`,
      },
      body: JSON.stringify({ password: password }),
    });

    const data = await response.json();

    if (data.status === 200) {
      setTimeout(() => {
        navigate("/login");
      }, 4000);

      toast.success("Password Reset was Successfull", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }

    toast.error("Unauthorized", {
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
    });
  };

  console.log(token);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <p className="text-md text-gray-900 font-thin dark:text-white">
            Your new password must be different from previous used passwords.
          </p>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
            onSubmit={handleResetPassword}
          >
            <div>
              <label
                for="password"
                className={
                  passwordLenghtErr || passwordErr
                    ? "block text-red-500 mb-2 text-sm font-medium"
                    : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                }
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={password}
                placeholder="••••••••"
                className={
                  passwordLenghtErr || passwordErr
                    ? "text-gray-900 dark:text-white border-red-500 block w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700"
                    : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                required
              />
              <p
                className={
                  passwordLenghtErr
                    ? "text-sm text-red-500 font-medium"
                    : "hidden"
                }
              >
                Password must be 6 characters or more.
              </p>
            </div>
            <div>
              <label
                for="confirm-password"
                className={
                  passwordErr
                    ? "block text-red-500 mb-2 text-sm font-medium"
                    : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                }
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm_password"
                onChange={handleChange}
                value={confirm_password}
                placeholder="••••••••"
                className={
                  passwordErr
                    ? "text-gray-900 dark:text-white border-red-500 block w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700"
                    : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                required
              />
              <p
                className={
                  passwordErr ? "text-sm text-red-500 font-medium" : "hidden"
                }
              >
                Passwords do not match.
              </p>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
