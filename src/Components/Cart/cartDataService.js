import axios from "axios";

export const sendOrderDetails = async (obj)=>{
    console.log(obj)
    const response = await axios.post("https://eatezy.onrender.com/postOrderData",obj);
    console.log(response)
    return response.data

}

