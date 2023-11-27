import axios from "axios";

const baseURL = process.env.NODE_ENV === "production"
  ? "https://eatezy.onrender.com"
  : "http://localhost:9090";

const axiosInstance = axios.create({
  baseURL
});

export const submitUserData = async(data)=>{
  try{
    const response = await axiosInstance.post("/postUserData",data);
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

export const getUserData = async(emailid,userpassword)=>{
  //console.log(emailid,userpassword)
    try {
        const response = await axiosInstance.get("/getUserData", {
        params:{emailid:emailid,userpassword:userpassword}});
        //console.log(response);
        return response.data;
      } catch (error) {
        if (error.message === "Network Error") {
          alert("Backend Services are down. Please try again later")
        }
        else {
          console.error("Error fetching previous order details:", error);
          throw error; // Re-throw the error to be handled by the calling code    
        }
        // else if (error.response && error.response.status === 401) {
        //   // Handle the 401 Unauthorized error
        //   //console.log("Unauthorized access. Please log in again.");
        //   // Perform any specific actions for unauthorized access, such as redirecting to a login page or displaying an error message
        // } else {
        //   // Handle other types of errors
        //   //console.log("An error occurred:", error.message);
        // }
        // throw error; // Re-throw the error to be caught by the caller if needed
      }
}

