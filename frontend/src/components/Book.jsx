import React from 'react'
import ParkingSpot from './ParkingSpot'

const Book = () => {
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
            </div>
            <div className='block text-left'>
              <span className='text-gray-500 dark:text-gray-400 font-medium text-xs'>Total</span>
              <div className='text-xl font-medium text-gray-900 dark:text-white'>kSH 300</div>
            </div>
            <button type="button" className="flex justify-center items-center mt-4 py-2.5 w-full text-base font-normal text-white bg-primary-600 rounded-lg border border-solid border-gray-400 transition duration-75 group hover:bg-primary-700 dark:text-white dark:hover:bg-primary-700 group-hover:border-none" aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-100 transition duration-75 dark:text-gray-100 group-hover:text-white dark:group-hover:text-white" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <span className="ml-3 whitespace-nowrap">Pay</span>
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