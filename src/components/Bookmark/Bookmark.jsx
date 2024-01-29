import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useBookmark } from "../context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";



function Bookmark() {
  const { isLoading, bookmarks, currentBookmark } = useBookmark()
  if (isLoading) <Loader />
  return (
    <div className="bookmarkList">
      <h2>Bookmark List ({bookmarks.length})</h2>
      {bookmarks.map(item => {
        return (
          <Link key={item.id} to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
      <div className={`bookmarkItem ${item.id === currentBookmark?.id ? "current-bookmark" : ""}`} >
        <ReactCountryFlag svg countryCode={item.countryCode}/>
        &nbsp; <strong>{item.cityName}</strong> &nbsp; <span>{item.country}</span>
      </div>
      </Link>
        )
      })}
      </div>
    
  )
}

export default Bookmark