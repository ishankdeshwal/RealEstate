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
        
        // Clear any existing token to force a fresh token fetch
        localStorage.removeItem("token");
        
        const res = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://real-estate-t82o.vercel.app",
            scope: "openid profile email offline_access",
          }
        });
        
        if (res) {
          console.log("Token fetched successfully:", res.substring(0, 10) + "...");
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

  // Force token refresh on component mount if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const refreshToken = async () => {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://real-estate-t82o.vercel.app",
              scope: "openid profile email offline_access",
            }
          });
          
          if (token) {
            localStorage.setItem("token", token);
            setUserDetails((prev) => ({ ...prev, token }));
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      };
      
      refreshToken();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, setUserDetails]);

  const { data: favData } = isAuthenticated && userDetails?.token ? UseFavourites() : { data: null };
  const { data: bookingsData } = isAuthenticated && userDetails?.token ? UseBookings() : { data: null };

  useEffect(() => {
    if (isAuthenticated && userDetails?.token && favData?.favResidenciesiD) {
      setUserDetails((prev) => ({
        ...prev,
        favourites: favData.favResidenciesiD,
      }))
    }
  }, [favData, isAuthenticated, userDetails?.token])

  useEffect(() => {
    if (isAuthenticated && userDetails?.token && bookingsData?.bookedVisits) {
      setUserDetails((prev) => ({
        ...prev,
        bookings: bookingsData.bookedVisits,
      }))
    }
  }, [bookingsData, isAuthenticated, userDetails?.token])

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
