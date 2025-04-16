import axios from 'axios'
import dayjs from 'dayjs'
import {toast} from 'react-toastify'

export const api=axios.create({
    baseURL:"https://real-estate-t82o.vercel.app/api"
})

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Adding token to request:", token.substring(0, 10) + "...");
    } else {
      console.warn("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized request:", error.config.url);
      toast.error("Authentication error. Please try logging in again.");
      // Clear the token to force a new login
      localStorage.removeItem("token");
    } else if (!error.response) {
      // Network error (no response from server)
      console.error("Network error:", error.message);
      toast.error("Network connection error. Please check your internet connection.");
    }
    return Promise.reject(error);
  }
);

export const getAllProperties=async()=>{
    try{
        const res=await api.get("/residency/all")
        if(res.status===400 || res.status===500){
            throw res.data
        }return res.data
    }catch(err){
        if (!err.response) {
            toast.error("Network connection error. Please check your internet connection.");
        } else {
            toast.error("Error fetching properties. Please try again.");
        }
        throw err
    }
}
export const getProperty=async(id)=>{
try {
    const res=await api.get(`/residency/${id}`,
        {timeout:10*1000})
    if(res.status===400 || res.status===500){
        throw res.data
    }return res.data
} catch (error) {
    if (!error.response) {
        toast.error("Network connection error. Please check your internet connection.");
    } else {
        toast.error("Error fetching property details. Please try again.");
    }
    throw error
}
}
export const createUser=async(email,token)=>{
    try {
       const res= await api.post('/user/register',{email},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;       
    } catch (error) {
        if (!error.response) {
            toast.error("Network connection error. Please check your internet connection.");
        } else {
            toast.error("Error creating user account. Please try again.");
        }
        throw error
    }
}
export const bookVisit=async(Date,PropertyId,email,token)=>{
    try {
        await api.post(`/user/bookVisit/${PropertyId}`,
            {
                email,
                id:PropertyId,
                date:dayjs(Date).format("DD/MM/YYYY")
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return true
    } catch (error) {
        if (!error.response) {
            toast.error("Network connection error. Please check your internet connection.");
        } else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Error booking visit. Please try again.");
        }
        throw error
    }
}
export const cancelBooking=async(id,email,token)=>{
    try {
        await api.post(`/user/removeBooking/${id}`,
            {
                email,
                id
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return true
    } catch (error) {
        if (!error.response) {
            toast.error("Network connection error. Please check your internet connection.");
        } else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Error canceling booking. Please try again.");
        }
        throw error
    }
}
export const toFav=async(id,email,token)=>{
    try {
        await api.post(`/user/tofav/${id}`,
            {
                email,
                id
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return true
    } catch (error) {
        if (!error.response) {
            toast.error("Network connection error. Please check your internet connection.");
        } else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Error updating favorites. Please try again.");
        }
        throw error
    }
}
export const getAllFav=async(email,token)=>{
    try {
        const res=await api.post('/user/allFav',
            {
                email
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data
    } catch (error) {
        if (!error.response) {
            toast.error("Network connection error. Please check your internet connection.");
        } else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Error fetching favorites. Please try again.");
        }
        throw error
    }
}
export const getAllBookings=async(email,token)=>{
    try {
        const res=await api.post('/user/getAllVisits',
            {
                email
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data
    } catch (error) {
        if (!error.response) {
            toast.error("Network connection error. Please check your internet connection.");
        } else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Error fetching bookings. Please try again.");
        }
        throw error
    }
}
export const createResidency = async (data, token) => {
    try {
        const formattedData = {
            ...data,
            facilities: typeof data.facilities === 'string' ? JSON.parse(data.facilities) : data.facilities,
            price: Number(data.price)
        };

        const res = await api.post(`/residency/create`, formattedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        if (error.response?.data?.message) {
            toast.error(error.response.data.message);
            if (error.response.data.details) {
                // Validation errors
            }
        } else {
            toast.error("Something went wrong while creating the residency");
        }
        throw error;
    }
}