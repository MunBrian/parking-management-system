import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  //Error state
  const [err, setErr] = useState({
    emailErr: false,
    passwordErr: false,
    phoneNumberErr: false,
    passwordLengthErr: false,
    // emailExist: false,
  });
  const [loadingState, setLoadingState] = useState(false);

  const {
    emailErr,
    passwordErr,
    phoneNumberErr,
    passwordLengthErr,
    //emailExist,
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
    if (!/^(?:7|1)\d{8}$/.test(phone_number)) {
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

    //if form is valid
    try {
      setLoadingState(true);
      const url = `${import.meta.env.VITE_SERVER_URL}/signup`;

      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          user_category: "motorist",
          phone_number: "254" + phone_number,
        }),
      });

      const response = await data.json();

      //if status is 400 - unauthorized
      if (response.status === 400) {
        setLoadingState(false);
        setErr((prevState) => ({
          ...prevState,
          emailExist: true,
        }));
        //console.log("Bad request");
        return;
      }

      setLoadingState(false);
      //if status is OK
      navigate("/login");
    } catch (error) {
      setLoadingState(false);
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
    <main className="lg:grid lg:grid-cols-2 w-screen h-screen">
      <section className="hidden bg-center bg-cover bg-no-repeat bg-[url('/assets/images/carpark.jpg')] bg-gray-700 bg-blend-multiply lg:block">
        <div className="px-4 max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-3xl font-extrabold tracking-wide text-white md:text-5xl lg:text-6xl">
            Park-It
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Find the perfect parking spot within the city.
          </p>
        </div>
      </section>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-2 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create Account
              </h1>
              <p className="text-md font-semibold text-gray-500 dark:text-gray-400">
                Are you a car park owner?{" "}
                <Link
                  to="/signup-parkowner"
                  className="font-bold text-primary-600 hover:underline dark:text-primary-500"
                >
                  List parking space with us.
                </Link>
              </p>
              <form
                className="space-y-4 md:space-y-3"
                action="#"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-6 md:grid-cols-2">
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
                    Mpesa mobile number
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="w-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                      placeholder="+254"
                      disabled
                    />
                    <input
                      type="text"
                      name="phone_number"
                      onChange={handleChange}
                      value={phone_number}
                      className={
                        phoneNumberErr
                          ? "text-gray-900 dark:text-white border-red-500 block w-5/6 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700"
                          : "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      placeholder="71234578"
                      required
                    />
                  </div>
                  <p
                    className={
                      phoneNumberErr
                        ? "text-sm text-red-500 font-medium"
                        : "hidden"
                    }
                  >
                    Please input a valid Mpesa phonenumber
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

export default SignUp;
