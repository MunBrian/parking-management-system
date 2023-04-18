import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-row">
        <div className="basis-1/2">
          <img className="object-cover h-screen" src="/assets/images/carpark.jpg" alt="car park" />
        </div>
        <div className="basis-1/2 bg-white flex flex-col">
            <div className="mt-16 text-center">
              <h1 className="text-4xl text-blue font-bold">LOG IN</h1>
              <h2 className="text-lg text-darkblue font-semibold mt-2">Login to search and reserve parking spaces.</h2>
            </div>
            <form className="flex flex-col m-auto w-96">
              <div className="mb-8">
                <label className="block text-midgrey text-base">Email address</label>
                <input className="border-midgrey border-2 rounded-md w-full p-4 text-black font-semibold placeholder:text-grey" type="email" name="email" placeholder="Email address" required/>
              </div>
              <div className="mb-8">
                <label className="block text-midgrey text-base">Password</label>
                <input className="border-midgrey border-2 rounded-md w-full p-4 text-black font-semibold placeholder:text-grey" type="password" name="" id="" placeholder="Password" required/>
              </div>
              <div className="mb-8">
                <a className="text-blue text-md font-semibold underline decoration-solid" href="">Forgot password</a>
              </div>
              <input className="p-4 mb-3 bg-blue font-semibold rounded-md text-white cursor-pointer transition duration-500 ease-in-out hover:bg-darkblue" type="submit" value="LOG IN" />
            </form>
            <div className="text-center mb-28">
              <p className="text-md">No account yet? <Link to="/signup" className="text-blue font-semibold underline decoration-solid" href="#">Create One</Link></p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login