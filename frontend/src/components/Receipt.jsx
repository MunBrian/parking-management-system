import Lottie from "lottie-react";
import { Link, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import Loading from "./Loading";

import "react-toastify/dist/ReactToastify.css";
import Unavailable from "../assets/animations/not-available.json";

const Receipt = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramValue = searchParams.get("paramValue");

  const [booked, setBooked] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!paramValue) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-800">
        <h3 className="text-3xl font-bold dark:text-white">
          No Receipt available
        </h3>

        <Lottie animationData={Unavailable} loop={true} className="w-52" />

        <Link
          to="/home/map"
          className="mb-1 text-xl underline font-medium text-gray-900 dark:text-white hover:text-primary-600"
        >
          Book Parking Space
        </Link>
      </div>
    );
  }

  //fetch user's vehicle details
  const fetchBooking = async (id) => {
    setIsLoading(true);
    try {
      const url = `http://localhost:8000/get-booking/${id}`;

      const response = await fetch(url);

      const data = await response.json();

      if (data.status === 200) {
        setBooked(data.booking);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //generate receipt
  const generateReceiptPDF = () => {
    const input = document.getElementById("receipt"); // ID of the container element to be converted

    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 277); // Adjust the coordinates and dimensions as per your requirements

      pdf.setTextColor(17, 24, 39);
      pdf.save("receipt.pdf");
    });
  };

  //fetch details
  useEffect(() => {
    if (paramValue) {
      fetchBooking(paramValue);
    }
  }, [paramValue]);

  let refNo = "";

  if (Object.keys(booked).length > 0) {
    const parts = booked.ID.split("-");
    refNo = parts[0].trim();
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center justify-center">
            <div className="w-2/5 p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col space-y-4 items-center pb-6 ">
                <svg
                  fill="none"
                  className="w-12 stroke-primary-800 stroke-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  ></path>
                </svg>
                <h5 className="mb-2 text-md font-normal tracking-tight text-gray-900 dark:text-gray-400">
                  Payment Success!
                </h5>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  KSH. {booked.total_fees}
                </h1>
              </div>
              <div id="receipt">
                <div className="border-t border-gray-500 py-6">
                  <div className="flex justify-between p-2">
                    <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">
                      Reference Number
                    </span>
                    <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-500">
                      {refNo}
                    </div>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">
                      Sender
                    </span>
                    <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-500">
                      {booked.motorist_name}
                    </div>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">
                      Booking Date
                    </span>
                    <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-500">
                      {booked.date}
                    </div>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">
                      Parking Space Name
                    </span>
                    <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-500">
                      {booked.parking_name}
                    </div>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">
                      Parking Slot
                    </span>
                    <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-500">
                      {booked.parking_slot}
                    </div>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">
                      Parking Duration
                    </span>
                    <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-500">
                      {booked.from_time} to {booked.to_time}
                    </div>
                  </div>
                </div>
                <div className="border-y border-dashed border-gray-500 py-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-normal tracking-tight text-gray-900 dark:text-gray-400">
                      Total Payment
                    </span>
                    <div className="text-base font-normal tracking-tight text-gray-900 dark:text-gray-500">
                      Ksh. {booked.total_fees}
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-2 mt-3">
                <button
                  type="button"
                  onClick={generateReceiptPDF}
                  className="flex justify-center items-center w-full gap-2 text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primary-500 dark:text-primary-400 dark:hover:text-white dark:hover:bg-primary-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    class="main-grid-item-icon"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  <span>Download PDF Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Receipt;
