import axios from "axios";
import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const{auth, setAuth} = useContext(AuthContext)

  // login
  const handleSubmit = async (e) =>{
    e.preventDefault();
    //  console.log("working")
    try{
      const {data} = await axios.post("/api/v1/auth/login", {email, password})
      if(data && data.success){
        toast.success(data.message)
        setAuth({
          ...auth,
          user:data.user,
          token:data.token
        })
        localStorage.setItem("auth", JSON.stringify(data))
        navigate(location.state || "/");
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error)
      toast.error("Something went wrong while login")
    }
    
  }


  return (
    <div className="bg-stone-900 min-h-screen">
      <Helmet>
        <title>Marques-Login</title>
      </Helmet>

      <div className="flex justify-center flex-col items-center gap-10 py-10">
        <h1 className="text-3xl text-purple-600 font-semibold">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 jusify-center items-center">
          <input
            type="text"
            placeholder="Email"
            className="bg-stone-950 w-120 py-2 px-4 rounded-md text-white border-none outline-none "
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          <input
            type="password"
            placeholder="Password"
            className="bg-stone-950 w-120 py-2 px-4 rounded-md text-white border-none outline-none "
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-500 px-6 py-2 tracking-wider text-lg rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
