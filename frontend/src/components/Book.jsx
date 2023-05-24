import { useEffect } from 'react'
import ParkingSpot from './ParkingSpot'
import {
  Input,
  Timepicker,
  initTE,
} from "tw-elements";



const Book = () => {

  useEffect(() => {
    initTE({ Input, Timepicker });
  }, [])

  return (
    <>
      <div className="flex items-start mb-8">
        <h3 className="text-3xl font-bold dark:text-white">Book Parking Space</h3>
      </div>
      <div className="grid gap-x-2 grid-cols-3">
        <div className="col-span-2 block p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-semibold dark:text-gray-200">Pick a Parking Slot</h3>
            <div className="grid gap-x-2 grid-cols-2 mt-3">
              <ParkingSpot />
              <ParkingSpot />
              <ParkingSpot />
              <ParkingSpot />
              <ParkingSpot />
              <ParkingSpot />
              <ParkingSpot />
              <ParkingSpot />
              <ParkingSpot />
            </div>
        </div>
        <div className="block p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold dark:text-gray-200">Booking Details</h3>
          <div className='flex flex-col space-y-5 mt-5 border-t border-gray-700 dark:border-gray-200 p-5'>
            <div className='block text-left'>
              <span className='text-gray-500 dark:text-gray-400 font-medium text-xs'>Parking Name</span>  
              <div className='text-xl font-medium text-gray-900 dark:text-white'>
                Green Span Parking
              </div> 
            </div>
            <div className='block text-left'>
              <span className='text-gray-500 dark:text-gray-400 font-medium text-xs'>
                Parking address
              </span>
              <div className='text-xl font-medium text-gray-900 dark:text-white'>
                GreenSpan Mall, Donholm
              </div>
            </div>
            <div className='block text-left'>
              <span  className='text-gray-500 dark:text-gray-400 font-medium text-xs'>
                Parking Slot:
              </span>
              <div className='text-xl font-medium text-gray-900 dark:text-white'> A002</div>
            </div>
            <div className='block text-left'>
              <span  className='text-gray-500 dark:text-gray-400 font-medium text-xs'>Motorist Name</span>
              <div className='text-xl font-medium text-gray-900 dark:text-white'>John Doe</div>
            </div>
            <div className='block text-left'>
              <span className='text-gray-500 dark:text-gray-400 font-medium text-xs'>Mobile Number</span>
              <div className='text-xl font-medium text-gray-900 dark:text-white'>0701234567</div>
            </div>
            <div className='block text-left'>
              <span className='text-gray-500 dark:text-gray-400 font-medium text-xs'>Car No plate</span>
              <div className='text-xl font-medium text-gray-900 dark:text-white'>KAA 891D</div>
            </div>
            <div className='block text-left'>
              <span className='text-gray-500 dark:text-gray-400 font-medium text-xs'>Choose Time</span>
              <div className='mt-3 flex gap-3'>
                <div className="relative" id="timepicker-inline-12" data-te-timepicker-init data-te-input-wrapper-init>
                    <input
                      type="text"
                      className="peer min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="form1" />
                    <label
                      for="form1"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >From 
                    </label>
                </div>
                <div className="relative" data-te-timepicker-init data-te-input-wrapper-init>
                    <input
                      type="text"
                      className="peer min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                      id="form1" />
                    <label
                      for="form1"
                      className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                      >To
                    </label>
                </div>
              </div>
            </div>
            <div className='block text-left'>
              <span className='text-gray-500 dark:text-gray-400 font-medium text-xs'>Total</span>
              <div className='text-xl font-medium text-gray-900 dark:text-white'>kSH 300</div>
            </div>
            <button type="button" className="flex justify-center items-center mt-4 py-2.5 w-full text-base font-normal text-white bg-primary-600 rounded-lg border border-solid border-gray-400 transition duration-75 group hover:bg-primary-700 dark:text-white dark:hover:bg-primary-700 group-hover:border-none" aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
              <svg fill="none" className="w-6 h-6 text-gray-100 transition duration-75 dark:text-gray-100 group-hover:text-white dark:group-hover:text-white" width="24" height="24" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"></path>
              </svg>
              <span className="ml-3 whitespace-nowrap text-md font-medium">Pay</span>
            </button>
          </div>
        </div>
        <div>

        </div>
      </div>
    </>
  )
}

export default Book