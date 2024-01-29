import { useNavigate } from 'react-router-dom';
import useUrlLocation from '../../hooks/useUrlLocation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
function AddNewBookmark() {
    const navigate = useNavigate();
    const [lat, lng] = useUrlLocation();
    const [cityName, setCityName] = useState()
    const [country, setCountry] = useState()

    useEffect(() => {
        async function fetchLocationData() {
            try {
                const { data } = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
                setCityName(data.city || data.locality || "")
                setCountry(data.countryName)
            } catch (err) {
                toast.error(err?.message)
            }
        }
        fetchLocationData()
    }, [])
    return (
        <div>
            <h2>Bookmark New Location</h2>
            <form className='form'>
                <div className="formControl">
                    <label htmlFor="cityName">City Name</label>
                    <input
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)} type="text" name='cityName' id='cityName' />
                </div>
                <div className="formControl">
                    <label htmlFor="country">Country Name</label>
                    <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text" name='country' id='country' />
                </div>
                <div className="buttons">
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            navigate(-1)
                        }} className="btn btn--back">&larr; back</button>
                    <button className="btn btn--primary">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewBookmark