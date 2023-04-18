import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="h-screen">
    <div className="flex flex-row">
      <div className="basis-1/2">
        <img className="object-cover h-screen" src="/assets/images/carpark.jpg" alt="car park" />
      </div>
      <div className="basis-1/2 bg-white flex flex-col">
          <div className="my-4 text-center">
            <h1 className="text-4xl text-blue font-bold">SIGN UP</h1>
          </div>
          <div className="mb-2 mx-auto">
          <p className="text-lg">Are you a car-park owner? <Link to="#" className="text-blue font-semibold underline decoration-solid" href="#">SignUp here</Link></p>
          </div>
          <form className="flex flex-col m-auto w-96">
           <div className="mb-5">
              <label className="block text-midgrey text-base">Full Name</label>
              <input className="border-midgrey border-2 rounded-md w-full p-4 text-black font-semibold placeholder:text-grey" type="text" name="firstName" placeholder="Enter first and last name" required/>
            </div>
            <div className="mb-5">
              <label className="block text-midgrey text-base">Email address</label>
              <input className="border-midgrey border-2 rounded-md w-full p-4 text-black font-semibold placeholder:text-grey" type="email" name="email" placeholder="Email address" required/>
            </div>
            <div className="mb-5">
              <label className="block text-midgrey text-base">Phone Number</label>
              <input className="border-midgrey border-2 rounded-md w-full p-4 text-black font-semibold placeholder:text-grey" type="text" name="phonenumber" placeholder="Phone Number" required/>
            </div>
            <div className="mb-5">
              <label className="block text-midgrey text-base">Password</label>
              <input className="border-midgrey border-2 rounded-md w-full p-4 text-black font-semibold placeholder:text-grey" type="password" name="password" placeholder="Password" required/>
            </div>
            <div className="mb-8">
              <label className="block text-midgrey text-base">Confirm Password</label>
              <input className="border-midgrey border-2 rounded-md w-full p-4 text-black font-semibold placeholder:text-grey" type="password" name="confirmPassword" id="" placeholder="Confirm Password" required/>
            </div>
            <input className="p-4 bg-blue font-semibold rounded-md text-white  cursor-pointer transition duration-500 ease-in-out hover:bg-darkblue" type="submit" value="SIGN UP" />
          </form>
          <div className="text-center mb-4">
            <p className="text-md">Already  have an account? <Link to="/login" className="text-blue font-semibold underline decoration-solid" href="#">Login</Link></p>
          </div>
      </div>
    </div>
  </div>
  )
}

export default SignUp