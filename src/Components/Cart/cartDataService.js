import axios from "axios";

const baseURL = process.env.NODE_ENV === "production"
  ? "https://eatezy.onrender.com"
  : "http://localhost:9090";

const axiosInstance = axios.create({
  baseURL
});

export const sendOrderDetails = async (obj)=>{
    //console.log(obj)
    try{
    const response = await axiosInstance.post("/postOrderData",obj);
    //console.log(response)
    return response.data
    }
    catch(error)
    {
        if (error.message === "Network Error") {
            alert("Backend Services are down. Please try again later")
          }
          else {
            console.error("Error fetching previous order details:", error);
            throw error; // Re-throw the error to be handled by the calling code    
          }
    }
}

