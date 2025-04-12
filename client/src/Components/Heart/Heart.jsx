import { useMutation } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import UserDetailContext from '../../Context/UserDetailsContext'
import { toFav } from '../../utils/Api'
import { checkFavourites, updateFavourites } from '../../utils/Common'
import UseAuthCheck from '../../hooks/useAuthCheck'
import { useAuth0 } from '@auth0/auth0-react'

function Heart({id}) {
  const [heartColor,setHeartColor]=useState("white")
  const{validateLogin}=UseAuthCheck()
  const{user}=useAuth0()

  const{
    userDetails:{favourites=[], token},
    setUserDetails,
  }=useContext(UserDetailContext)

  useEffect(()=>{
    if (Array.isArray(favourites)) {
      setHeartColor(()=>checkFavourites(id,favourites))
    }
  },[favourites, id])

  const {mutate}=useMutation({
    mutationFn:()=>toFav(id,user?.email,token),
    onSuccess:()=>{
      setUserDetails((prev)=>(
        {
          ...prev,
          favourites:updateFavourites(id,prev.favourites)
        }
      ))
    }
    })
  const handleLike=()=>{
    if(validateLogin()){
      mutate()
    }
  }
  return (
    <AiFillHeart
    size={25}
    color={heartColor}
    onClick={(e)=>{
      e.stopPropagation()
      handleLike()
    }}
    />
  )
}

export default Heart