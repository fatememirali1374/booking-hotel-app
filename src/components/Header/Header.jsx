import { MdLocationOn } from "react-icons/md"
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi"
import { useRef, useState } from "react"
import useOutsideClick from "../hooks/useOutsideClick";
function Header() {
    const [destination, setDestination] = useState("");
    const [openOption, setOpenOptions]= useState(false);
    const [options, setOptions]= useState({
        adult:1,
        children:0,
        room:1
    });
    const handleOptions= (name,operation) =>{
        setOptions((prev)=>{
            return{
                ...prev,
                [name]:operation=== "inc"? options[name] +1: options[name] -1
            }
        })
    }
    return (
        <div>
            <div className="header">
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
                        <div className="dateDropDown">2023/06/12</div>
                        <span className="seperator"></span>
                    </div>
                    <div className="headerSearchItem">
                        <div id="optionDropDown"
                        onClick={()=>setOpenOptions(!openOption)}>{options.adult} adult &bull; {options.children} children &bull; {options.room} room </div>
                       {openOption && <GuestOptionList
                       setOpenOptions={setOpenOptions}
                       handleOptions={handleOptions} options={options}/>}
                        <span className="seperator"></span>
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerSearchBtn">
                            <HiSearch className=" headerIcon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;

function GuestOptionList({options, handleOptions, setOpenOptions}){
    const optionsRef= useRef();
    useOutsideClick(optionsRef, "optionDropDown", ()=>setOpenOptions(false))
    return(
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
            handleOptions={handleOptions}/>
            <OptionItem
            type="room"
            options={options}
            minLimit={1}
            handleOptions={handleOptions}/>
        </div>
    )
}

function OptionItem ({options,type, minLimit,handleOptions}){
    return(
        <div className="guestOptionItem">
            <span className="optionText">{type}</span>
            <div className="optionCounter">
                <button
                onClick={()=> handleOptions(type,"dec")}
                className="optionCounterBtn" 
                disabled={options[type]<= minLimit}>
                    <HiMinus className="icon"/>
                </button>
                <span className="optionCounterNumber">{options[type]}</span>
                <button
                onClick={()=> handleOptions(type,"inc")}
                className="optionCounterBtn">
                    <HiPlus className="icon"/>
                </button>
            </div>
        </div>
    )
}