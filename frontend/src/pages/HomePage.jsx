import Logout from "../components/Logout"
import { RxDashboard } from 'react-icons/rx'
import { HiOutlineMapPin } from 'react-icons/hi2'
import { TfiReceipt } from 'react-icons/tfi'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import {TbBrandBooking} from 'react-icons/tb'
import { FiSettings } from 'react-icons/fi'
import { SlLogout } from 'react-icons/sl'
import { useState } from "react"

const HomePage = () => {

  return (
    <div className="bg-dark w-screen flex">
      <div className="bg-darkgrey w-1/6 h-screen flex flex-col py-14 text-lightgrey items-center text-lg">
        <div className="flex-1 space-y-3">
          <div className="flex items-center p-2">
            <img className="h-14 w-14 rounded-full" src="/assets/images/empty-profile.png" alt="profile pic" />
          </div>
          <div className="flex p-2 rounded-lg items-center hover:bg-blue">
            <RxDashboard className="mr-2 text-xl"/>
            <div>
              <button>Dashboard</button> 
            </div>
          </div>
          <div className="flex p-2 rounded-lg items-center hover:bg-blue" >
            <HiOutlineMapPin className="mr-2 text-xl"/>
            <div> 
              <button>Map</button> 
            </div>
          </div>
          <div className="flex p-2 rounded-lg items-center hover:bg-blue" >
            <TbBrandBooking className="mr-2 text-xl"/>
            <div> 
              <button>Book Space</button> 
            </div>
          </div>
          <div className="flex p-2 rounded-lg items-center hover:bg-blue">
            <TfiReceipt className="mr-2 text-xl"/>
            <div>
              <button>Receipt</button> 
            </div>
          </div>
          <div className="flex p-2 rounded-lg items-center hover:bg-blue">
            <HiOutlineDocumentReport className="mr-2 text-xl"/>
            <div>
              <button>Report</button> 
            </div>
          </div>
          <div className="flex p-2 rounded-lg items-center hover:bg-blue">
            <FiSettings className="mr-2 text-xl"/>
            <div>
              <button>Settings</button> 
            </div>
          </div>
        </div>

        <div className="flex p-2 rounded-lg items-center hover:bg-blue mr-10">
          <SlLogout className="mr-2 text-xl"/>
          <div>
            <button>Logout</button> 
          </div>
        </div>
      </div>
      <div className="w-5/6 ml-4 text-lightgrey p-14">
          <h1 className="text-3xl font-bold">Hello Mungai</h1>
      </div>
    </div>
  )
}

export default HomePage