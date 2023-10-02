import axios from "axios"

export const viewOrderDetails = async(emailid) => {
    console.log(emailid)
    const response = await axios.get(`https://eatezy.onrender.com/vieworderdetails`,{
        params:{emailid:emailid}})
    console.log(response)
    return response.data;
}

export const viewPreviousOrderDetails = async(emailid) =>{
    console.log(emailid)
    const response = await axios.get(`https://eatezy.onrender.com/viewpreviousorderdetails`,{
        params:{emailid:emailid}})
    console.log(response)
    return response.data;
}