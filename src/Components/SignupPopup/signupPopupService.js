import axios from "axios";

export const submitUserData = async(data)=>{
    const response = await axios.post("https://eatezybackend.onrender.com/postUserData",data);
    console.log(response)
    return response.data
}

export const getUserData = async(emailid,userpassword)=>{
  console.log(emailid,userpassword)
    try {
        const response = await axios.get("https://eatezy.onrender.com/getUserData", {
        params:{emailid:emailid,userpassword:userpassword}});
        console.log(response);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle the 401 Unauthorized error
          console.log("Unauthorized access. Please log in again.");
          // Perform any specific actions for unauthorized access, such as redirecting to a login page or displaying an error message
        } else {
          // Handle other types of errors
          console.log("An error occurred:", error.message);
        }
        throw error; // Re-throw the error to be caught by the caller if needed
      }
}

