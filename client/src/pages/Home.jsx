import React, {useContext} from 'react'
import { Helmet } from 'react-helmet'
import AuthContext from '../context/AuthContext'


const Home = () => {
  const {auth, setAuth} = useContext(AuthContext)
  return (
    <div className='min-h-screen bg-stone-900 px-18 text-white text-2xl'>
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