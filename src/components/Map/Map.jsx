import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { useHotels } from "../context/HotelsProvider"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useGeoLocation from "../../hooks/useGeoLocation"

function Map() {
    const { isLoading, hotels } = useHotels()
    const [mapCenter, setMapCenter] = useState([50, 5])
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng")

    const { isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition } = useGeoLocation();

    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng]);
    }, [lat, lng]);
    useEffect(() => {
        if (geolocationPosition?.lat && geolocationPosition?.lng)
            setMapCenter([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition])
    return (
        <div className="mapContainer">
            <MapContainer
                className="map"
                center={mapCenter}
                zoom={13}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <button onClick={getPosition} className="getLocation">
                    {isLoadingPosition ? "Loading..." : "Use Your Location"}
                </button>
                <ChangeCenter position={mapCenter} />
                {hotels.map((item) => {
                    <Marker key={item.id} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.host_location}
                        </Popup>
                    </Marker>
                })}

            </MapContainer>
        </div>
    )
}

export default Map

const ChangeCenter = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
}