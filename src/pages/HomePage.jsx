import Logout from "../components/Logout"
import { RxDashboard } from 'react-icons/rx'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { TfiReceipt } from 'react-icons/tfi'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { BiLogOut } from 'react-icons/bi'
import { useState } from "react"
import Dashboard from "../components/Dashboard"
import Map from "../components/Map"

const HomePage = () => {
  const [dashboard, setDashBoard] = useState(false)
  const [map, setMap] = useState(false)

  const handleDashboard = (e) => {
    e.preventDefault()

    setDashBoard(true)

    console.log(dashboard)
  }

  
  const handleMap = (e) => {
    e.preventDefault()

    setMap(true)
    setDashBoard(false)

    console.log(map)
  }





  return (
    <div className="bg-black flex w-screen h-screen">
      <div className="basis-1/6 bg-light-black text-white py-12 flex flex-col items-center">
        <div>
          <ul className="space-y-10">
            <li  onClick={handleDashboard}> <a href="#" className="flex align-center items-center"><RxDashboard className="text-2xl mr-2" /> Dashboard</a></li>
            <li onClick={handleMap}> <a href="#" className="flex space-x-2 align-center items-center"><HiOutlineMapPin className="text-2xl mr-2" /> Map</a></li>
            <li> <a href="#" className="flex space-x-2 align-center items-center"><TfiReceipt className="text-2xl mr-2" /> Receipt</a></li>
            <li> <a href="#" className="flex space-x-2 align-center items-center"><HiOutlineDocumentReport className="text-2xl mr-2" /> Report</a></li>
          </ul>
        </div>
        <div className="mt-auto mr-10">
            <a href="#" className="flex space-x-2 align-center items-center"><BiLogOut className="text-2xl" /> <Logout /></a> 
        </div>
      </div>
      <div className="basis-5/6">
        { dashboard ? <Dashboard /> : map ? <Map /> : <Dashboard />}
      </div>
    </div>
  )
}

export default HomePage