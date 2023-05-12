import { MapContainer, Marker, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import MapPopup from "./MapPopup"


const Map = () => { 

  const markers = [{
    geocode: [-1.284989, 36.819228],
    popUp:"KICC"
  }
  ,
  {
    geocode: [-1.289185, 36.813058],
    popUp:"Uhuru Park"
  },
  {
    geocode: [-1.282537, 36.828456],
    popUp:"Jevanjee Gardens"
  }]
  
  return (
    <div className="overflow-x-auto">
      <div className="flex items-start mb-8">
        <h3 className="text-3xl font-bold dark:text-white">Choose a Parking Spot</h3>
      </div>
      <div className="">
          <div className="h-screen w-full">
            <MapContainer center={[-1.2882, 36.8233]} zoom={15} className="h-full" >
              <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/search?query=Nairobi#map=11/-1.3040/36.8774">Open street map</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            {
              markers.map(marker => (
                <Marker position={marker
                .geocode }
                >
                <MapPopup />
                </Marker>
              ))
            }
            </MapContainer>
          </div>
          <div>
           Map Card
          </div>
      </div>
    </div>
  )
}

export default Map