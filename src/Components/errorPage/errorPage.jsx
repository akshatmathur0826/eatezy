import React from "react";
import '../../Components/errorPage/errorpage.css'
import { useNavigate } from "react-router-dom";

const ErrorPage = () =>{

    const navigate = useNavigate()
    const gotohomepage = ()=>{
        navigate('/')
    }

    return (
        <div className="container-2">
      <h2>Sorry, we couldn't process your request.</h2>
      {/* <h1></h1> */}
      <p>
      The mall you're looking for has not been associated with our application. Please make sure you entered the correct mall name or URL.
      </p>
      <button onClick={gotohomepage}>Go back home</button>
    </div>
    )
}

export default ErrorPage