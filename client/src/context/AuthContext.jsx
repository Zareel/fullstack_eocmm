import { useState, createContext } from "react";


const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user:null,
        token:""
    })
    return(
        <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
    )
    }




export default AuthContext;