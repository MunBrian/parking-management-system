import React from 'react'

const MotoristDashboardTable = () => {
  return (
    <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Duration
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Parking Space
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Total Cost
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        30/4/2023
                    </th>
                    <td className="px-6 py-4">
                        30 mins
                    </td>
                    <td className="px-6 py-4">
                        Green span
                    </td>
                    <td className="px-6 py-4">
                        ksh 100
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        1/5/2023
                    </th>
                    <td className="px-6 py-4">
                        4 hrs
                    </td>
                    <td className="px-6 py-4">
                        Safaricom House
                    </td>
                    <td className="px-6 py-4">
                        ksh 500
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        2/5/2023
                    </th>
                    <td className="px-6 py-4">
                        60 mins
                    </td>
                    <td className="px-6 py-4">
                        TRM 
                    </td>
                    <td className="px-6 py-4">
                        ksh 200
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default MotoristDashboardTable