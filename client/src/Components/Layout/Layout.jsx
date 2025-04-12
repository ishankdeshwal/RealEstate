import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from '@tanstack/react-query'
import UserDetailContext from '../../Context/UserDetailsContext'
import { createUser } from '../../utils/Api'
import UseFavourites from '../../Hooks/UseFavourites'
import UseBookings from '../../Hooks/UseBookings'
import { toast } from 'react-toastify'

function Layout() {
  const { isAuthenticated, user, getAccessTokenSilently, isLoading, loginWithRedirect } = useAuth0();
  const { userDetails, setUserDetails } = useContext(UserDetailContext)
  const [tokenFetchAttempted, setTokenFetchAttempted] = useState(false);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
    onSuccess: () => {
      console.log('User registered successfully')
    },
    onError: (error) => {
      console.error('User registration failed:', error)
    }
  })

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        setTokenFetchAttempted(true);
        
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setUserDetails((prev) => ({ ...prev, token: storedToken }));
          return;
        }
        
        const res = await getAccessTokenSilently({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email offline_access",
          }
        });
        
        if (res) {
          localStorage.setItem("token", res);
          setUserDetails((prev) => ({ ...prev, token: res }));
          mutate(res);
        } else {
          console.error("Token is null or undefined");
          toast.error("Authentication failed. Please try logging in again.");
        }
      } catch (err) {
        console.error("Token fetch failed:", err);
        
        if (err.message.includes("Missing Refresh Token")) {
          toast.error("Session expired. Please log in again.");
          loginWithRedirect();
        } else {
          toast.error("Authentication failed. Please try logging in again.");
        }
      }
    }
  
    if (isAuthenticated && !userDetails?.token && !isLoading && !tokenFetchAttempted) {
      getTokenAndRegister();
    }
  }, [isAuthenticated, isLoading, userDetails?.token, getAccessTokenSilently, mutate, tokenFetchAttempted, loginWithRedirect]);

  const { data: favData } = UseFavourites();

  const { data: bookingsData } = UseBookings();

  useEffect(() => {
    if (favData?.favResidenciesiD) {
      setUserDetails((prev) => ({
        ...prev,
        favourites: favData.favResidenciesiD,
      }))
    }
  }, [favData])

  useEffect(() => {
    if (bookingsData?.bookedVisits) {
      setUserDetails((prev) => ({
        ...prev,
        bookings: bookingsData.bookedVisits,
      }))
    }
  }, [bookingsData])

  return (
    <>
      <div className='bg-[var(--black)] overflow-hidden'>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
