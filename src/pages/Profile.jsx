import React from 'react'
import LogIn from '../components/LogIn'
import { useAuthContext } from '../context/UserContext'


const Profile = () => {
const {user,setUser} = useAuthContext()
  return (
    <div>
      {user && <> TIENES ACCESO </>
      }
    </div>
  )
}

export default Profile