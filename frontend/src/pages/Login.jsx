import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState({
    emailErr: false,
    loginErr: false,
  });

  const [loadingState, setLoadingState] = useState(false);

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
      setLoadingState(true);
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

        setLoadingState(false);
        //console.log("Bad request");
        return;
      }

      //if valid,. navigate to home page
      navigate("/home/");
      setLoadingState(false);

      Cookies.set("token", response.token, { expires: 3 });
    } catch (error) {
      console.log(error);
      setLoadingState(false);
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
          <p className="lg:hidden block mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
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
