import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";



function Hotels() {
    const [serchParams, setSearchParams] = useSearchParams();
    const destination = serchParams.get("destination")
    const room = JSON.parse(serchParams.get("options"))?.room;
    const { isLoading, data } = useFetch(
        "http://localhost:5000/hotels", 
        // q means all query --- name_like , host_location_like , _like
        `q=${destination || ""}&accommodates_gte=${room || 1}`
    )
    if (isLoading) <Loader />
    return (
        <div>{data.length}</div>
    )
}

export default Hotels