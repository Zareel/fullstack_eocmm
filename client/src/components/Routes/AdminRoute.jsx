import axios from 'axios'
import React,{useState, useEffect, useContext} from 'react'
import { Outlet } from 'react-router-dom'
import Loader from '../Loader'
import AuthContext from '../../context/AuthContext'

const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const {auth} = useContext(AuthContext)

    useEffect(() => {
        const authCheck = async () => {
            try{
                const {data} = await axios.get("/api/v1/auth/admin-auth")
                setOk(data.ok)
            }catch(error){
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    }, [auth?.token])

  return (
    ok? <Outlet/> : <Loader/>
  )
}

export default AdminRoute