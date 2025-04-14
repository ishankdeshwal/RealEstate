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
        toast.error("Something went Wrong")
        throw err
    }
}
export const getProperty=async(id)=>{
try {
    const res=await api.get(`/residency//${id}`,
        {timeout:10*1000})
    if(res.status===400 || res.status===500){
        throw res.data
    }return res.data
} catch (error) {
    toast.error('Something went wrong')
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
        toast.error('Something went wrong,Please Try Again')
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
    } catch (error) {
        toast.error('Something went wrong,Please Try Again')
        throw error
    }
}
export const removebooking=async(id,email,token)=>{
    try {
        await api.post(`/user/removeBooking/${id}`,
            {
                email,
            },{
                headers:{
                    Authorization:`Bearer ${token}` 
                }
            }
        )
    } catch (error) {
        toast.error('Something went wrong,Please Try Again')
        throw error
    }
}
export const toFav=async(id,email,token)=>{
    try {
      const res= await api.post(`/user/toFav/${id}`,
            {email},{
                headers:{
                 Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data
    } catch (error) {
     if(error.response.status===401){
        toast.error("You must login to favorite this property.",{position:"bottom-right"})
    }else{
        toast.error("Something went wrong")
     }
        throw error
    }
}
export const getAllFav = async (email, token) => {
    if (!token) {
        console.warn("No token provided to getAllFav");
        return { favResidenciesiD: [] };
    }

    try {
        console.log("Fetching favorites for:", email);
        // First try with POST request
        const res = await api.post(
            '/user/allFav',
            { email }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        console.log("Favorites response:", res.data);
        
        if (res.data && Array.isArray(res.data.favResidenciesiD)) {
            return res.data;
        } else if (Array.isArray(res.data)) {
            return { favResidenciesiD: res.data };
        } else if (res.data && typeof res.data === 'object') {
            return { favResidenciesiD: [] };
        } else {
            return { favResidenciesiD: [] };
        }
    } catch (error) {
        console.error("Error fetching favorites:", error);
        
        // If POST fails, try with GET request as fallback
        if (error.response?.status === 404 || error.response?.status === 405) {
            try {
                console.log("Trying GET request as fallback");
                const fallbackRes = await api.get(
                    `/user/allFav?email=${encodeURIComponent(email)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                
                console.log("Fallback response:", fallbackRes.data);
                
                if (fallbackRes.data && Array.isArray(fallbackRes.data.favResidenciesiD)) {
                    return fallbackRes.data;
                } else if (Array.isArray(fallbackRes.data)) {
                    return { favResidenciesiD: fallbackRes.data };
                }
            } catch (fallbackError) {
                console.error("Fallback request also failed:", fallbackError);
            }
        }
        
        if (error.response?.status === 404) {
            toast.error("User not found. Please try logging in again.");
        } else {
            toast.error("Something went wrong while fetching favorites");
        }
        return { favResidenciesiD: [] };
    }
}
export const getAllBookings = async (email, token) => {
    if (!token) {
        console.warn("No token provided to getAllBookings");
        return { bookedVisits: [] };
    }
    
    try {
        console.log("Fetching bookings for:", email);
        // First try with POST request
        const res = await api.post(
            `/user/getAllVisits`,
            { email }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        console.log("Bookings response:", res.data);
        
        if (res.data && Array.isArray(res.data.bookedVisits)) {
            return res.data;
        } else if (Array.isArray(res.data)) {
            return { bookedVisits: res.data };
        } else if (res.data && typeof res.data === 'object') {
            return { bookedVisits: [] };
        } else {
            return { bookedVisits: [] };
        }
    } catch (error) {
        console.error("Error fetching bookings:", error);
        
        // If POST fails, try with GET request as fallback
        if (error.response?.status === 404 || error.response?.status === 405) {
            try {
                console.log("Trying GET request as fallback");
                const fallbackRes = await api.get(
                    `/user/getAllVisits?email=${encodeURIComponent(email)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                
                console.log("Fallback response:", fallbackRes.data);
                
                if (fallbackRes.data && Array.isArray(fallbackRes.data.bookedVisits)) {
                    return fallbackRes.data;
                } else if (Array.isArray(fallbackRes.data)) {
                    return { bookedVisits: fallbackRes.data };
                }
            } catch (fallbackError) {
                console.error("Fallback request also failed:", fallbackError);
            }
        }
        
        if (error.response?.status === 404) {
            toast.error("User not found. Please try logging in again.");
        } else {
            toast.error("Something went wrong while fetching bookings");
        }
        return { bookedVisits: [] };
    }
}
export const createResidency = async (data, token) => {
    try {
        const formattedData = {
            ...data,
            facilities: typeof data.facilities === 'string' ? JSON.parse(data.facilities) : data.facilities,
            price: Number(data.price)
        };

        const res = await api.post(`/residency/create`,
            { data: formattedData },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
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