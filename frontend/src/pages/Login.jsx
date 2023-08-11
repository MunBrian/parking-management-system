import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState({
    emailErr: false,
    loginErr: false,
  });

  const { emailErr, loginErr } = err;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setErr({
      emailErr: false,
      loginErr: false,
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

    //if form is valid
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/login`;

      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await data.json();

      //if status is 400 - unauthorized
      if (response.status === 400) {
        setErr((prevState) => ({
          ...prevState,
          loginErr: true,
        }));
        //console.log("Bad request");
        return;
      }

      localStorage.setItem("user-data", response.token);

      //if valid,. navigate to home page
      navigate("/home/");
    } catch (error) {
      console.log(error);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <main className="lg:grid lg:grid-cols-2 w-screen h-screen">
      <section className="hidden bg-center bg-cover bg-no-repeat bg-[url('/assets/images/carpark.jpg')] bg-gray-700 bg-blend-multiply lg:flex lg:items-center">
        <div className="px-4 max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-3xl font-extrabold tracking-wide md:text-5xl lg:text-6xl text-white">
            Park-It
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Find the perfect parking spot within the city.
          </p>
        </div>
      </section>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <h1 className="lg:hidden block mb-4 text-3xl font-extrabold tracking-wide md:text-5xl lg:text-6xl text-gray-900 dark:text-white">
            Park-It
          </h1>
          <p className="lg:hidden block mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48">
            Find the perfect parking spot within the city.
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome Back
              </h1>
              <div
                className={`p-3 bg-red-500 text-white text-center my-1.5 rounded-md ${
                  !loginErr ? "hidden" : " "
                }`}
              >
                <p>Invalid Email or Password. Try Again!!</p>
              </div>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
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
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    id="email"
                    placeholder="name@company.com"
                    className={
                      emailErr
                        ? "text-gray-900 dark:text-white border-red-500 block w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700"
                        : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    }
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
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in to your account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up here
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

export default Login;
