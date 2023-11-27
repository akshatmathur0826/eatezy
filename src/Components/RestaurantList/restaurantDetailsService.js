import axios from "axios";

const baseURL = process.env.NODE_ENV === "production"
  ? "https://eatezy.onrender.com"
  : "http://localhost:9090";

const axiosInstance = axios.create({
  baseURL
});

export const getAllDetails = async(mall,location)=>{
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3IxfT8xdGzNrSC9gU/queQufDMGqQxMS9VCCWobyTuRg='
        }
      };
      const response = await axiosInstance.get(`https://api.foursquare.com/v3/places/search?query=${mall}&categories=17114&near=${location}&limit=1`, options);
      //console.log(response.data);
      return response.data
}

export const getRestoDetails = async(mallid)=>{
  //console.log(mallid)
  const response = await axiosInstance.get("/getMallid",{
    params:{mallid:mallid}
  })
  let data = response.data
  //console.log(response.data)
  return data;
}

export const getImage = async(mallid)=>{
  //console.log(mallid)
  const response = await axiosInstance.get(`/getMallimage`,{
    params:{mallid:mallid}
  })

  //console.log(response)
  let data = response.data
  let imageData = []
  for (var i = 0; i < data.length; i++) {
    const decodedData = atob(data[i]);
    const buffer = new ArrayBuffer(decodedData.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < decodedData.length; i++) {
      view[i] = decodedData.charCodeAt(i);
    }
    const blob = new Blob([view], { type: 'image/jpeg' });
    const objectURL = URL.createObjectURL(blob);
    //console.log(objectURL)
    imageData.push(objectURL)
  }
  //console.log(imageData)
  return imageData;
}

export const getRestarurantDetails = async(mallid)=>{
  //console.log(mallid)
  try{
  const response = await axiosInstance.get("/restaurantdetails",{
    params:{mallid:mallid}
  })
  let data = response.data
  //console.log(response.data)
  return data;
}
catch(error){
  if (error.message === "Network Error") {
    alert("Backend Services are down. Please try again later")
  }
  else {
    console.error("Error fetching previous order details:", error);
    throw error; // Re-throw the error to be handled by the calling code    
  }
}
}

export const getmenuitems = async(restaurantid)=>{
  try{
  const response = await axiosInstance.get("/menuitems",{
    params:{restaurantid:restaurantid}
  });
  //console.log(response.data);
  return response.data;
}
  catch(error){
  if (error.message === "Network Error") {
    alert("Backend Services are down. Please try again later")
  }
  else {
    console.error("Error fetching previous order details:", error);
    //throw error; // Re-throw the error to be handled by the calling code    
  }
}
}