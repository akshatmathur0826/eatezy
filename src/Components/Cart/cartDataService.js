import axios from "axios";

export const sendOrderDetails = async (obj)=>{
    console.log(obj)
    const response = await axios.post("http://localhost:9090/postOrderData",obj);
    console.log(response)
    return response.data

}

