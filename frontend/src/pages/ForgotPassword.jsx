import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailErr(false);
  };

  //handle recover password submit
  const handlePasswordRecover = async (e) => {
    e.preventDefault();

    //Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailErr((prevState) => ({
        ...prevState,
        emailErr: true,
      }));
      return;
    }

    try {
      const url = "http://localhost:8000/forgot-password";

      //send email backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (data.status === 400) {
        //send error message
        return toast.error("Email doesnot exist. Please input a valid email", {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }

      if (data.status === 200) {
        setSuccess(true);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <div
            className={`p-3 bg-primary-700 text-white text-center my-1.5 rounded-md ${
              !success ? "hidden" : " "
            }`}
          >
            <p>Please Check your Email for a Password Reset Link.</p>
          </div>
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot Password
          </h2>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Don't worry. Enter an email associated with your account
          </p>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handlePasswordRecover}
          >
            <div>
              <label
                for="email"
                className={
                  emailErr
                    ? "block text-red-500 mb-2 text-sm font-medium"
                    : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                }
              >
                Email
              </label>
              <input
                value={email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className={
                  emailErr
                    ? "text-gray-900 dark:text-white border-red-500 block w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700"
                    : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
                placeholder="name@company.com"
                required
              />
              <p
                className={
                  emailErr ? "text-sm text-red-500 font-medium" : "hidden"
                }
              >
                Please input a valid email address
              </p>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Recover
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Go back{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
