import React, { useState } from "react";
import '../SignupPopup/signup.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faApple, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { submitUserData, getUserData } from "./signupPopupService";

// library.add(fas)
const Signup = ({ onClose, callBackEvent }) => {

  const [fullname, setFullName] = useState(null)
  const [emailid, setEmailId] = useState(null)
  const [userpassword, setUserPassword] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  console.log(onClose)
  
  const closeModal = () => {
    onClose()
  }
  const handleNameChange = (e) => {
    setFullName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmailId(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value)
  }

  const submitUserDetails = () => {
    let obj = {}
    obj['fullname'] = fullname
    obj['emailid'] = emailid
    obj['userpassword'] = userpassword
    console.log(obj)
    submitUserData(obj).then((data) => {
      if (data === 'Success') {
        getUserDetails(emailid, userpassword)
        closeModal()
        //localStorage.setItem('user',JSON.stringify(obj))
      }
      else{
        setErrorMessage('Account already exists')
      }
    })
  }

  const getUserDetails = (emailid, userpassword) => {
    getUserData(emailid, userpassword).then((data) => {
      //localStorage.setItem('user', JSON.stringify(data))
      setEmailId(null)
      setFullName(null)
      setUserPassword(null)
      console.log(callBackEvent)
      callBackEvent(data)
    })
  }

  return (
    <div className="modal-singup">
      <div className="modal-content-singup">
        <span className="close-singup"
          onClick={closeModal}
        >
          &times;
        </span>
        <h2 style={{ color: 'black', marginTop: '0%' }}>Sign Up</h2>
        <h3 className="header-signup" style={{ color: 'black' }}>Hey, Enter your details to get sign up to your account</h3>
        <form>
          <input
            type="name"
            placeholder="Full Name"
            value={fullname}
            onChange={handleNameChange}
          />
          <br />

          <input
            type="email"
            placeholder="Email"
            value={emailid}
            onChange={handleEmailChange}
          />
          <br />
          <input
            type="Password"
            placeholder="Passcode"
            value={userpassword}
            onChange={handlePasswordChange}
          >
          </input>
          {/* <FontAwesomeIcon icon="fa fa-eye-slash" className="input-icon-signup" /> */}

          <br />
          <button className="submit-signup" type="button" onClick={submitUserDetails}>
            Sign up
          </button>
        </form>
        {/* <br/> */}
        {/* <p style={{ fontSize: 'xx-small', padding: '15px 0px 10px 0px', fontWeight: 'bolder' }}>&#8211; Or Sign up with &#8211;</p> */}
        <div className="container-singup">
          {errorMessage}
          {/* <br/> */}
          {/* <button className="google" ><FontAwesomeIcon icon={faGoogle} /> Google</button>
          <button className="apple"> <FontAwesomeIcon icon={faApple} /> Apple ID</button>
          <button className="facebook" > <FontAwesomeIcon icon={faFacebook} /> Facebook</button> */}
        </div>
        {/* <h4 className="footer-signup" style={{ color: 'black' }}>Already have an account? <span className="linkToSignINPage-signup" style={{ color: 'black' }}> Login Now</span></h4> */}
      </div>
    </div>


  )
}

export default Signup;