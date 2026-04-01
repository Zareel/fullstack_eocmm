import { useState, useEffect,useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import {Outlet,} from "react-router-dom";
import Loader from "../Loader";


const PrivateRoute = () => {
    const [ok,  setOk] = useState(false)
    const {auth} = useContext(AuthContext)
  
  

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

    return ok? <Outlet/> : <Loader/>
}

export default PrivateRoute