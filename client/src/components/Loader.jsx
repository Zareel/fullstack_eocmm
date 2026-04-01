import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Loader = () => {
  const [count, setCount] =  useState(3)
  const navigate = useNavigate();
  const location = useLocation();

 useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div className='flex justify-center items-center flex-col h-screen gap-6 bg-stone-900'>
      <h1 className='text-2xl font-bold text-purple-500'>{`Redirecting in ${count} seconds`}</h1>
        <div className='w-15 h-15 border-4 border-dashed border-purple-500 rounded-full animate-[spin_3s_linear_infinite] '></div>
    </div>
  )
}

export default Loader





