import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useGeoLocation from "../../hooks/useGeoLocation"
import useUrlLocation from "../../hooks/useUrlLocation"

function Map({ markerLocations }) {

    const [mapCenter, setMapCenter] = useState([50, 5])
    const [lat, lng] = useUrlLocation()

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
                <DetectClick />
                <ChangeCenter position={mapCenter} />
                {markerLocations.map((item) => {
                    return (
                        <Marker key={item.id} position={[item.latitude, item.longitude]}>
                            <Popup>
                                {item.host_location}
                            </Popup>
                        </Marker>
                    )
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

const DetectClick = () => {
    const navigate = useNavigate()
    useMapEvent({
        click: e => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
    return null
}