import React, { useContext, useEffect, useRef } from 'react'
import UserDetailContext from '../Context/UserDetailsContext'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllFav } from '../utils/Api'
import { useQuery } from '@tanstack/react-query'

function UseFavourites() {
  const {userDetails,setUserDetails}=useContext(UserDetailContext)
  const queryRef=useRef()
  const{user}=useAuth0()
  
  const {data,isLoading,isError,refetch}=useQuery({
    queryKey:["allFavourites", user?.email, userDetails?.token],
    queryFn:()=>getAllFav(user?.email,userDetails?.token),
    onSuccess:(data)=>{
      if (data && data.favResidenciesiD) {
        setUserDetails((prev)=>({...prev,favourites:data.favResidenciesiD}))
      }
    },
    enabled:!!user && !!userDetails?.token,
    staleTime:30000
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