import { createContext, useContext } from "react"
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelContext = createContext()

function HotelsProvider({ children }) {
    const [serchParams, setSearchParams] = useSearchParams();
    const destination = serchParams.get("destination")
    const room = JSON.parse(serchParams.get("options"))?.room;
    const { isLoading, data: hotels } = useFetch(
        "http://localhost:5000/hotels",
        // q means all query --- name_like , host_location_like , _like
        `q=${destination || ""}&accommodates_gte=${room || 1}`
    )
    return (
        <HotelContext.Provider value={{ isLoading, hotels }}>{children}</HotelContext.Provider>
    )
}

export default HotelsProvider;

export function useHotels() {
    return useContext(HotelContext)
}