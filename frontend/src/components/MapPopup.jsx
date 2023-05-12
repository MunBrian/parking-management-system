import { Link } from "react-router-dom"
import { popup } from "leaflet";
import { Popup } from "react-leaflet"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MapPopup = () => {
  return (
       <>
        <Popup className="custom-popup">  
            <div class="max-w-sm bg-white border w-80 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Carousel showThumbs={false} showStatus={false}  className="rounded-lg">
                    <div className="rounded-lg">
                        <img src="https://fastly.picsum.photos/id/133/2742/1828.jpg?hmac=0X5o8bHUICkOIvZHtykCRL50Bjn1N8w1AvkenF7n93E"  className="rounded-t-lg h-40 object-cover" alt=""  />
                    </div>
                    <div>
                        <img src="https://fastly.picsum.photos/id/88/1280/1707.jpg?hmac=NnkwPVDBTVxHkc4rALB_fyu-OHY2usdm7iRk5El7JC4" className="rounded-t-lg h-40 object-cover" alt="" />
                    </div>
                {/* add more images to the carousel */}
                </Carousel>
                <div class="p-5 text-center">
                    <h5 class="text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">Greenspan Parking</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">GreenSpan Mall, Nairobi</p>
                    <p class="mb-3 font-normal text-gray-900 dark:text-gray-100">ksh 100/h</p>
                    <Link to="/home/book" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700">
                        Book
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </Link>
                </div>
            </div>

        </Popup>
       </>

  )
}

export default MapPopup