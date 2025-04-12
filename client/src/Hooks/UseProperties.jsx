import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from '../utils/Api';

function UseProperties() {
    const {data,isError,isLoading,refetch}=useQuery(
       {
        queryKey: ["allProperties"],  
        queryFn: getAllProperties,
        refetchOnWindowFocus: false,
       }
    )
  return {
    data,isError,isLoading,refetch
  }
}

export default UseProperties