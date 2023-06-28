import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpOwner = () => {
  const navigate = useNavigate();

  //Error state
  const [err, setErr] = useState({
    emailErr: false,
    passwordErr: false,
    phoneNumberErr: false,
    passwordLengthErr: false,
    emailExist: false,
  });

  const {
    emailErr,
    passwordErr,
    phoneNumberErr,
    passwordLengthErr,
    emailExist,
  } = err;

  //form data state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const {
    first_name,
    last_name,
    email,
    phone_number,
    password,
    confirm_password,
  } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    //on input change hide errors
    setErr({
      emailErr: false,
      passwordErr: false,
      phoneNumberErr: false,
      passwordLengthErr: false,
      emailExist: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErr((prevState) => ({
        ...prevState,
        emailErr: true,
      }));
      return;
    }

    //validate phone number must be of Kenyan origin
    if (
      !/^(?:254)((?:(?:7(?:(?:[01249][0-9])|(?:5[789])|(?:6[89])))|(?:1(?:[1][0-5])))[0-9]{6})$/.test(
        phone_number
      )
    ) {
      setErr((prevState) => ({
        ...prevState,
        phoneNumberErr: true,
      }));

      return;
    }

    //validate length of password
    if (password.length < 6) {
      setErr((prevState) => ({
        ...prevState,
        passwordLengthErr: true,
      }));
      return;
    }

    //vaidate password matching
    if (password !== confirm_password) {
      setErr((prevState) => ({
        ...prevState,
        passwordErr: true,
        passwordLengthErr: false,
      }));
      return;
    }

    console.log(formData);

    //if form is valid
    try {
      const url = "http://localhost:8000/signup";

      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, user_category: "park-owner" }),
      });

      const response = await data.json();

      //if status is 400 - unauthorized
      if (response.status === 400) {
        setErr((prevState) => ({
          ...prevState,
          emailExist: true,
        }));
        //console.log("Bad request");
        return;
      }

      //if status is OK
      navigate("/login");
    } catch (error) {
      console.log(error);
    }

    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <main className="grid grid-cols-2 w-screen h-screen">
      <section className="bg-center bg-cover bg-no-repeat bg-[url('/assets/images/carpark.jpg')] bg-gray-700 bg-blend-multiply flex items-center">
        <div className="px-4 max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-3xl font-extrabold tracking-wide text-white md:text-5xl lg:text-6xl">
            Parking Spot
          </h1>
          <p className="mb-8 text-lg font-normal tracking-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Find the perfect parking spot within the city.
          </p>
        </div>
      </section>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create Account
              </h1>
              <div
                className={`p-3 bg-red-500 text-white text-center my-1.5 rounded-md ${
                  !emailExist ? "hidden" : " "
                }`}
              >
                <p>User Already Exists. Login!!</p>
              </div>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      for="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      onChange={handleChange}
                      value={first_name}
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
                      id="last_name"
                      name="last_name"
                      onChange={handleChange}
                      value={last_name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="email"
                    className={
                      emailErr
                        ? "block text-red-500 mb-2 text-sm font-medium"
                        : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    }
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={email}
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

                <div>
                  <label
                    for="phone_number"
                    className={
                      phoneNumberErr
                        ? "block text-red-500 mb-2 text-sm font-medium"
                        : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    }
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    onChange={handleChange}
                    value={phone_number}
                    className={
                      phoneNumberErr
                        ? "text-gray-900 dark:text-white border-red-500 block w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700"
                        : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    placeholder="254712345600"
                    required
                  />
                  <p
                    className={
                      phoneNumberErr
                        ? "text-sm text-red-500 font-medium"
                        : "hidden"
                    }
                  >
                    Please input a valid phonenumber
                  </p>
                </div>
                <div>
                  <label
                    for="password"
                    className={
                      passwordLengthErr || passwordErr
                        ? "block text-red-500 mb-2 text-sm font-medium"
                        : "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    }
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    id="password"
                    placeholder="••••••••"
                    className={
                      passwordLengthErr || passwordErr
                        ? "text-gray-900 dark:text-white border-red-500 block w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700"
                        : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
                    required
                  />
                  <p
                    className={
                      passwordLengthErr
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
                      passwordErr
                        ? "text-sm text-red-500 font-medium"
                        : "hidden"
                    }
                  >
                    Passwords do not match.
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpOwner;
