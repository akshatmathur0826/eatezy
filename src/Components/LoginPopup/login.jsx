import React, { useState } from "react";
import '../LoginPopup/login.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faTwitter, faApple, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { getUserData } from "../SignupPopup/signupPopupService";
import Signup from "../SignupPopup/signup";
import {useCookies} from "react-cookie";
//import { faHatCowboy } from '@fortawesome/pro-thin-svg-icons'
//import { faHatChef } from '@fortawesome/sharp-solid-svg-icons'
//import { faPlateUtensils } from '@fortawesome/sharp-regular-svg-icons'

// library.add(fas, faTwitter)//, faFontAwesome, faHatCowboy)


const Login = ({onClose,callBackEvent}) => {

 
  
  const [emailid, setEmailId] = useState('')
  const [userpassword, setUserPassword] = useState('')
  const [switchtoSignUpModal, setSwitchtoSignUpModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [cookies, setCookie] = useCookies(["user"]);


  const closeModal = () => {
    onClose();
  };

  const getUserDetails = ()=>{
    //let obj = {}
    // obj['emailid'] = emailid
    // obj['userpassword'] = userpassword
    // //console.log(obj)
    getUserData(emailid,userpassword).then((data)=>{
      if(data !== 'Invalid EmailID or Passcode')
      {
        callBackEvent(data)
        closeModal()
      }
      else{
        setErrorMessage('Invalid EmailID or Passcode')
      }
    })
    
  }
  
  const handleEmailChange = (e)=>{
    setEmailId(e.target.value)
  } 

  const handlePasswordChange = (e)=>{
    setUserPassword(e.target.value)
  } 

  const showSignUpModal = ()=>{
    setSwitchtoSignUpModal(true)
  }

  const closeSignUpModal = ()=>{
    setSwitchtoSignUpModal(false)
  }

  const gotDataFromSignUpPage = (data) => {
    //console.log(data)
    //localStorage.setItem('user', JSON.stringify(data))
    setCookie('user',JSON.stringify(data))
    setSwitchtoSignUpModal(false)
    closeModal()
    //setUserData(data)
    // /setLogin(true)
}

  return (
    <div className="modal-login">
      <div className="modal-content-login">
       
        <h2 style={{color:'black'}}>Login</h2>
        <span className="close-login" onClick={closeModal}
        // onClick={handleModalClose}
        >
          &times;
        </span>
        <h3 className="header-login" style={{color:'black'}}>Hey, Enter your details to get sign in to your account</h3>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={emailid}
            onChange={handleEmailChange}
          />
         <br/>
          <input
            type="Password"
            placeholder="Passcode"
            value={userpassword}
            onChange={handlePasswordChange}
          >
            </input>
            {/* <FontAwesomeIcon icon="fa fa-eye-slash" className="input-icon-login"/> */}
           
          <br />
          <button className="submit-login" type="button" onClick={getUserDetails}>
            Sign in
          </button>
        </form>
        {/* <br/> */}
        {/* <p style={{fontSize:'xx-small',padding:'15px 0px 10px 0px',fontWeight:'bolder'}}>&#8211; Or Sign in with &#8211;</p> */}
        {<div className="container-login">
          {errorMessage}
          {/* // <button className="google" ><FontAwesomeIcon icon={faGoogle}/> Google</button>
          // <button className="apple"> <FontAwesomeIcon icon={faApple} /> Apple ID</button>
          // <button className="facebook" > <FontAwesomeIcon icon={faFacebook}/> Facebook</button> */}
        </div> }
      <h4 className="footer-login" style={{color:'black'}}>Don't have an account? <span onClick={showSignUpModal} className="linkToSignINPage-login" style={{color:'black', cursor:'pointer'}}>Request Now</span></h4>
      </div>
      <>
      {switchtoSignUpModal && (
  <Signup onClose={closeSignUpModal} callBackEvent={gotDataFromSignUpPage} />
)}</>
    </div>


  )
}

export default Login;