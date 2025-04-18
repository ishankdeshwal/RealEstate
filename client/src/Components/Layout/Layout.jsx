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

  const { mutate: registerUser } = useMutation({
    mutationFn: ({ email, token, password }) => createUser(email, token, password),
    onSuccess: (data) => {
      console.log("User registered successfully", data);
      // Even if user already exists, we consider it a success
      if (data.message === "User Already Registered" || data.message === "User Registered Successfully") {
        setUserDetails((prev) => ({
          ...prev,
          token: token,
          email: email,
        }));
      }
    },
    onError: (error) => {
      console.error("Error registering user:", error);
      toast.error(error.response?.data?.message || "Failed to register user");
    },
  });

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
          registerUser({ 
            email: user?.email, 
            token: res,
            password: user?.email // Using email as password for now
          });
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
  }, [isAuthenticated, isLoading, userDetails?.token, getAccessTokenSilently, registerUser, tokenFetchAttempted, loginWithRedirect]);

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

  const { data: favData } = UseFavourites();
  const { data: bookingsData } = UseBookings();

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
