import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { useBookmark } from "../context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";


function SingleBookmark() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBookmark, currentBookmark, isLoading } = useBookmark()

    useEffect(() => {
        getBookmark(id)
    }, [id]);
    if (isLoading || !currentBookmark) return <Loader />
    return (
        <div>
            <button style={{ marginBottom: ".5rem", fontWeight: "bold" }} onClick={() => navigate(-1)} className="btn btn--back">&larr; back</button>
            <div >
                <h2 style={{ marginBottom: "1rem" }}>{currentBookmark.cityName}</h2>
                <div style={{ marginBottom: "1rem" }} className="bookmarkItem">
                    <div>
                        <strong>{currentBookmark.cityName}</strong>  &nbsp;_  &nbsp;<span>{currentBookmark.country}</span>
                    </div>
                    <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
                </div>

            </div>
        </div>
    )
}

export default SingleBookmark