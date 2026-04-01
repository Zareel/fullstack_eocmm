import React, {useContext} from 'react'
import { Helmet } from 'react-helmet'
import AuthContext from '../context/AuthContext'
import Dropdown from '../components/Dropdown'


const Home = () => {
  const {auth, setAuth} = useContext(AuthContext)
  return (
    <div className='min-h-screen bg-stone-900 px-18  text-lg text-cyan-300'>
        <Helmet>
            <title>MarqueZ-Home</title>
        </Helmet>

        <div>
          <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
        
    </div>
  )
}

export default Home