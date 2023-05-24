const Receipt = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-2/5 p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col space-y-4 items-center pb-6 ">
        <svg fill="none" className="w-12 stroke-primary-800 stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path>
        </svg>
            <h5 className="mb-2 text-md font-normal tracking-tight text-gray-900 dark:text-gray-400">Payment Success!</h5>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">KSH. 400</h1>
        </div>
        <div className="border-t border-gray-500 py-6">
        <div className="flex justify-between p-2">
            <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">Reference Number</span>
            <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200">A233ncb37</div>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">Sender</span>
            <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200">John Doe</div>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">Payment Time</span>
            <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200">24-05-2023, 8:40</div>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">Parking Space Name</span>
            <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200">Jacaranda Parking </div>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-xs font-normal tracking-tight text-gray-900 dark:text-gray-400">Parking Slot</span>
            <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200">A0015</div>
          </div>
          <div className="flex justify-between p-2">
            <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">Parking Duration</span>
            <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200">9:00 AM  to 12:00 PM </div>
          </div>
        </div>
        <div className="border-y border-dashed border-gray-500 py-3">
          <div className="flex justify-between">
              <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">Total Payment</span>
              <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-200">Ksh. 400</div>
          </div>
        </div>
        <div className="py-2 mt-3">
          <button type="button" className="flex justify-center items-center w-full gap-2 text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primary-500 dark:text-primary-400 dark:hover:text-white dark:hover:bg-primary-800">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          <span>
            Get PDF Receipt
          </span>
        </button>
          </div>
        </div>
      </div>
  )
}

export default Receipt