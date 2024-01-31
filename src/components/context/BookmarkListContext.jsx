import { createContext, useContext, useEffect, useReducer, useState } from "react"

import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext()
const BASE_URL = "http://localhost:5000"


const initialState = {
    isLoading: false,
    bookmarks: [],
    currentBookmark: null,
    error: null
}
function bookmarkReducer(state, action) {
    switch (action.type) {
        case "loading": return {
            ...state,
            isLoading: true
        }
        case "bookmarks/loaded": return {
            ...state,
            isLoading: false,
            bookmarks: action.paylode
        }
        case "bookmark/loaded": return {
            ...state,
            isLoading: false,
            currentBookmark: action.paylode
        }
        case "bookmark/created": return {
            ...state,
            isLoading: false,
            bookmarks: [...state.bookmarks, action.paylode],
            currentBookmark: action.paylode
        }
        case "bookmark/deleted": return {
            ...state,
            isLoading: false,
            bookmarks: state.bookmarks.filter((item) => item.id !== action.paylode),
            currentBookmark: null
        }
        case "rejected": return {
            ...state,
            isLoading: false,
            error: action.paylode
        }
        default:
            throw new Error("Unknown action")
    }
}

function BookmarkListProvider({ children }) {
    // const [currentBookmark, setCurrentBookmark] = useState({}) 
    // const [bookmarks, setBookmarks] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    const [{ isLoading, bookmarks, currentBookmark }, dispatch] = useReducer(bookmarkReducer, initialState);
    useEffect(() => {
        async function fetchBookmarkList() {
            // setIsLoading(true)
            dispatch({ type: "loading" })
            try {
                const { data } = await axios.get(`${BASE_URL}/bookmarks`);
                // setBookmarks(data)
                dispatch({ type: "bookmarks/loaded", paylode: data })
            } catch (error) {
                dispatch({ type: "rejected", paylode: error.message })
                // toast.error(error.message)
            }
            // finally {
            //     setIsLoading(false)
            // }
        }
        fetchBookmarkList()
    }, [])

    async function getBookmark(id) {
if(Number(id)===currentBookmark?.id) return;

        // setIsLoading(true)
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
            // setCurrentBookmark(data)
            dispatch({ type: "bookmark/loaded", paylode: data })

        } catch (error) {
            // toast.error(error.message)
            dispatch({ type: "rejected", paylode: error.message })
        }
        // finally {
        //     setIsLoading(false)
        // }
    }

    async function createBookmark(newBookmark) {
        // setIsLoading(true)
        dispatch({ type: "loading" })
        try {
            const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
            // setCurrentBookmark(data)
            // setBookmarks((prev) => [...prev, data])
            dispatch({ type: "bookmark/created", paylode: data })

        } catch (error) {
            // toast.error(error.message)
            dispatch({ type: "rejected", paylode: error.message })
        }
        //  finally {
        //     setIsLoading(false)
        // }
    }

    async function deleteBookmark(id) {
        // setIsLoading(true)
        dispatch({ type: "loading" })
        try {
            await axios.delete(`${BASE_URL}/bookmarks/${id}`);
            // setBookmarks((prev) => prev.filter(item => item.id !== id))
            dispatch({ type: "bookmark/deleted", paylode: id })
        } catch (error) {
            // toast.error(error.message)
            // or
            dispatch({ type: "rejected", paylode: error.message })
        }
        // finally {
        //     setIsLoading(false)
        // }
    }

    return (
        <BookmarkContext.Provider value={{
            isLoading,
            currentBookmark,
            bookmarks,
            getBookmark,
            createBookmark,
            deleteBookmark
        }}>{children}</BookmarkContext.Provider>
    )
}

export default BookmarkListProvider;

export function useBookmark() {
    return useContext(BookmarkContext)
}