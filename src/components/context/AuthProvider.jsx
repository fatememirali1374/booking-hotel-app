import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false
}

const FAKE_USER={
    name:"fateme",
    email:"User@gmail.com",
    password:"1111"
}
function authReduced(state, action) {
switch(action.type){
case "login": return{
    user: action.payload,
    isAuthenticated: true
}
    case "logout":return{
        user: null,
        isAuthenticated: false
    }
    default:
        throw new Error("Unknown action!!!")
}
 }
export default function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        authReduced,
        initialState)

    function login(email,password) {
if(email===FAKE_USER.email && password===FAKE_USER.password)
dispatch({type:"login", payload:FAKE_USER})
    }
    function logout() {
dispatch({type:"logout"})
    }

    return <AuthContext.Provider
        value={{
            user,
            isAuthenticated,
            login,
            logout
        }}
    >
        {children}
    </AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext)
}