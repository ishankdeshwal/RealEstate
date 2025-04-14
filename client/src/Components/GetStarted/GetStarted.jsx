import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../../Context/UserDetailsContext'

function GetStarted() {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { userDetails } = useContext(UserDetailContext);

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      // If user is not logged in, redirect to login
      loginWithRedirect();
    } else {
      // If user is logged in, navigate to properties page
      navigate('/properties');
    }
  };

  return (
    <div className='pt-10'>
        <div className='paddings innerWidth'>
                <div className='g-inner flex flex-col justify-center items-center bg-[#4161df] gap-[1.5rem] p-6 rounded-xl border-[6px] border-[#5d77d6] text-center'>
                    <span className='text-[1.5rem] font-bold text-white'>Get Started With Homyz</span>
                    <span className='text-[0.8rem] text-[rgb(255,255,255,0.587)]'>
                    Subscribe and find super attractive price quotes from us.
                    <br />
                    Find your residence soon
                    </span>
                    <button 
                      className='button text-xs w-30 h-20'
                      onClick={handleGetStarted}
                    >
                      Get Started
                    </button>
                </div>
        </div>
    </div>
  )
}

export default GetStarted