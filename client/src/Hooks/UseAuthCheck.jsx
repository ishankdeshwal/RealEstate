import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { toast } from 'react-toastify'

function UseAuthCheck() {
    const {isAuthenticated}=useAuth0()
    const validateLogin=()=>{
        if(!isAuthenticated){
            toast.error("You must be logged in",{position:"bottom-right"})
            return false;
        }else{
            return true;
        }
    }
  return {
    validateLogin
  }
}

export default UseAuthCheck