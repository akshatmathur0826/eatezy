import axios from "axios";

const baseURL = process.env.NODE_ENV === "production"
  ? "https://eatezy.onrender.com"
  : "http://localhost:9090";

const axiosInstance = axios.create({
  baseURL
});

export const viewOrderDetails = async (emailid) => {
  try {
    //console.log("Email ID:", emailid);
    const response = await axiosInstance.get("/vieworderdetails", {
      params: { emailid: emailid },
    });
    //console.log("Response:", response.data);
    
    
    
    return response.data;
  }
  catch (error) {
    //console.log(error)
    if (error.message === "Network Error") {
      alert("Backend Services are down. Please try again later")
    }
    else {
      console.error("Error fetching previous order details:", error);
      throw error; // Re-throw the error to be handled by the calling code    
    }
  }
};

export const viewPreviousOrderDetails = async (emailid) => {
  try {
    
    
    //console.log("Email ID:", emailid);
    const response = await axiosInstance.get("/viewpreviousorderdetails", {
      params: { emailid: emailid },
    });
    //console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    if (error.message === "Network Error") {
      alert("Backend Services are down. Please try again later")
    }
    else {
      console.error("Error fetching previous order details:", error);
      throw error; // Re-throw the error to be handled by the calling code    
    }

  }
};
