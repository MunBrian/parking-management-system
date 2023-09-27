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
  const [loadingState, setLoadingState] = useState(false);

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

    try {
      setLoadingState(true);
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
        setLoadingState(false);
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

      setLoadingState(false);
      toast.error("Unauthorized", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } catch (error) {
      console.log(error);
      setLoadingState(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex h-screen flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
              {loadingState && (
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
