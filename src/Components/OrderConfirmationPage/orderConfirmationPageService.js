import axios from "axios"

export const viewOrderDetails = async(emailid) => {
    console.log(emailid)
    const response = await axios.get(`http://localhost:8080/vieworderdetails`,{
        params:{emailid:emailid}})
    console.log(response)
    return response.data;
}

export const viewPreviousOrderDetails = async(emailid) =>{
    console.log(emailid)
    const response = await axios.get(`http://localhost:8080/viewpreviousorderdetails`,{
        params:{emailid:emailid}})
    console.log(response)
    return response.data;
}