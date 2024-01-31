import { MdLocationOn } from "react-icons/md"
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi"
import { useRef, useState } from "react"
import useOutsideClick from "../../hooks/useOutsideClick";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import { NavLink, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

function Header() {
    const [serchParams, setSearchParams] = useSearchParams();
    const [destination, setDestination] = useState(
        serchParams.get("destination") || "")
    const [openOption, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);
    const [openDate, setOpenDate] = useState(false)
    const navigate = useNavigate();

    const handleOptions = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1
            }
        })
    }
    const handleSearch = () => {
        const encodedParams = createSearchParams({
            date: JSON.stringify(date),
            destination,
            options: JSON.stringify(options)
        })
        navigate({
            pathname: "/hotels",
            search: encodedParams.toString()
        })
        // how set search params=> setSearchParams(encodedParams)
    }
    return (
        <div>
            <div className="header">
               <NavLink to={"/bookmark"}>bookmark</NavLink>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <MdLocationOn className="headerIcon locationIcon" />
                        <input
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            type="text"
                            className="headerSearchInput"
                            placeholder="where to go?"
                            name="destination"
                            id="destination" />

                        <span className="seperator"></span>
                    </div>
                    <div className="headerSearchItem">
                        <HiCalendar className=" headerIcon  dateIcon" />
                        <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
                            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}
                        </div>

                        {
                            openDate && (

                                < DateRange

                                    onChange={(item) => setDate([item.selection])}
                                    ranges={date}
                                    className="date"
                                    minDate={new Date()}
                                    moveRangeOnFirstSelection={true} />

                            )

                        }


                        <span className="seperator"></span>
                    </div>
                    <div className="headerSearchItem">
                        <div id="optionDropDown"
                            onClick={() => setOpenOptions(!openOption)}>{options.adult} adult &bull; {options.children} children &bull; {options.room} room </div>
                        {openOption && <GuestOptionList
                            setOpenOptions={setOpenOptions}
                            handleOptions={handleOptions} options={options} />}
                        <span className="seperator"></span>
                    </div>
                    <div className="headerSearchItem">
                        <button onClick={handleSearch} className="headerSearchBtn">
                            <HiSearch className=" headerIcon" />
                        </button>
                    </div>
                </div>
                <NavLink to={"/login"}>Login</NavLink>
            </div>
        </div>
    )
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
    const optionsRef = useRef();
    useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false))
    return (
        <div className="guestOptions" ref={optionsRef}>
            <OptionItem
                type="adult"
                options={options}
                minLimit={1}
                handleOptions={handleOptions}
            />
            <OptionItem
                type="children"
                options={options}
                minLimit={0}
                handleOptions={handleOptions} />
            <OptionItem
                type="room"
                options={options}
                minLimit={1}
                handleOptions={handleOptions} />
        </div>
    )
}

function OptionItem({ options, type, minLimit, handleOptions }) {
    return (
        <div className="guestOptionItem">
            <span className="optionText">{type}</span>
            <div className="optionCounter">
                <button
                    onClick={() => handleOptions(type, "dec")}
                    className="optionCounterBtn"
                    disabled={options[type] <= minLimit}>
                    <HiMinus className="icon" />
                </button>
                <span className="optionCounterNumber">{options[type]}</span>
                <button
                    onClick={() => handleOptions(type, "inc")}
                    className="optionCounterBtn">
                    <HiPlus className="icon" />
                </button>
            </div>
        </div>
    )
}

