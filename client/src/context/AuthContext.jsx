import { useState,useEffect, createContext } from "react";
import axios from "axios";


const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user:null,
        token:""
    })

    // default axios
    // axios.defaults.headers.common["Authorization"] = auth?.token
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;

    // baseUrl
    //axios.defaults.baseURL = "http://localhost:4000";
    

    // local storage
    useEffect(() =>{
        const data = localStorage.getItem("auth")
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                user:parseData.user,
                token:parseData.token
            })
        }
        // eslint-disable-next-line
    } ,[])

    useEffect(() => {})
    
    return(
        <AuthContext.Provider value={{auth, setAuth}}>{children}</AuthContext.Provider>
    )
    }




export default AuthContext;