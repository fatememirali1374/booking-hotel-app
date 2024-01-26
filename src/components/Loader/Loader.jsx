import { LoaderIcon } from "react-hot-toast"


function Loader() {
    return (
        <divp style={{
            color: "var(--primary-600)", display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "1rem auto"
        }}>
            <p>loding data...</p>
            <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
        </divp>
    )
}

export default Loader