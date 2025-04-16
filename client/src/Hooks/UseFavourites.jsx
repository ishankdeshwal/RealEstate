import React, { useContext, useEffect, useRef } from 'react'
import UserDetailContext from '../Context/UserDetailsContext'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllFav } from '../utils/Api'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

function UseFavourites() {
  const {userDetails,setUserDetails}=useContext(UserDetailContext)
  const queryRef=useRef()
  const{user}=useAuth0()
  
  const {data,isLoading,isError,error,refetch}=useQuery({
    queryKey:["allFav", user?.email, userDetails?.token],
    queryFn:()=>getAllFav(user?.email,userDetails?.token),
    onSuccess:(data)=>{
      if (data && data.favResidenciesiD) {
        setUserDetails((prev)=>({...prev,favourites:data.favResidenciesiD}))
      }
    },
    onError: (error) => {
      if (error.response?.status === 404) {
        toast.error("User not found. Please try logging in again.")
      } else if (error.response?.status === 500) {
        toast.error("Server error while fetching favorites. Please try again later.")
      } else {
        toast.error("Error fetching favorites. Please try again.")
      }
    },
    enabled:!!user && !!userDetails?.token,
    staleTime:30000,
    retry:1
  })
  
  queryRef.current=refetch
  
  useEffect(()=>{
    if (userDetails?.token) {
      queryRef.current && queryRef.current()
    }
  },[userDetails?.token])
  
  return {data,isError,isLoading,refetch}
}

export default UseFavourites