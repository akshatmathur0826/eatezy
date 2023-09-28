import React, { useRef, useState } from "react";
import Login from "../LoginPopup/login";
import Signup from "../SignupPopup/signup";
// import '../HomeScreen/homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartData from "../Cart/CartData";
import '../NavBar/navBar.css'
import {useCookies} from "react-cookie";
import { viewPreviousOrderDetails } from "../OrderConfirmationPage/orderConfirmationPageService";

//fsq3IxfT8xdGzNrSC9gU/queQufDMGqQxMS9VCCWobyTuRg=
const NavBar = () => {

    const [loginbtn, setLoginbtn] = useState(false);
    const [signupbtn, setSignupbtn] = useState(false);
    const [login, setLogin] = useState(false)
    //const [userData, setUserData] = useState([])
    const [location, setLocation] = useState("")
    const [mall, setMall] = useState("")
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    console.log(cookies)
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value)
    }

    const handMallChange = (e) => {
        setMall(e.target.value)
    }

    const toggleLoginPage = () => {
        setLoginbtn(!loginbtn)
    }

    const toggleSignUpPage = () => {
        setSignupbtn(!signupbtn)
    }

    const showListofMall = (e) => {
        if (e.keyCode === 13 && location!=='') {
            console.log((`/${location}/${mall}`))
            navigate(`/${location}/${mall}`)
            console.log(location)
            console.log(mall)
            setLocation("")
            setMall("")
        }
        else if(e.keyCode === 13 && location === ''){
            alert('Plz enter the location')
        }


    };

    const gotDataFromLoginPage = (data) => {
        console.log(data)
        //localStorage.setItem('user', JSON.stringify(data))
        setCookie('user',JSON.stringify(data))
        //setUserData(data)
        setLogin(true)
    }

    const backtoHomePage = () => {
        navigate('/')
    }

    const handleLogout = () => {
        //localStorage.removeItem('user');
        removeCookie('user')
        setLogin(false);
        navigate('/')
        //setUserData([]);
    }

    const viewPreviousOrders = () =>{
        viewPreviousOrderDetails(cookies.user.emailid).then((data)=>{
            console.log(data)
            navigate('/orderhistory',{state:data})
        })
    }


    return (


        <header>
            <div className="nav">
                <div>
                    <h1 style={{ cursor: 'pointer' }} onClick={backtoHomePage}>EatEzy</h1>
                </div>
                <div>
                    {(cookies.user !== undefined) ?
                        <ul className="nav-bar">
                            <li><CartData /></li>
                            <li className="dropdown">
                                <div className="username" onClick={toggleDropdown}>
                                    {cookies.user.fullname} ▼
                                    <div className="dropdown-content">
                                        <button onClick={viewPreviousOrders}>Order History</button>
                                        <hr/>
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        :
                        <ul className="nav-bar">
                            <li><CartData /></li>
                            <li onClick={toggleLoginPage}>Login</li>
                            {loginbtn && <Login onClose={toggleLoginPage} callBackEvent={gotDataFromLoginPage} />}
                            <li onClick={toggleSignUpPage}>Sign up</li>
                            {signupbtn && <Signup onClose={toggleSignUpPage} callBackEvent={gotDataFromLoginPage} />}</ul>}
                </div>
            </div>
            <form className="head"
                ref={ref}
                onKeyUp={showListofMall}
                tabIndex={0}>
                <div className="search" >
                    <FontAwesomeIcon icon={faLocationDot} className="locationIcon" />
                    <input type="text" placeholder="Mumbai" className="location" onChange={handleLocationChange}
                        value={location} />

                    <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
                    <input type="text" placeholder="Search for Shopping Mall" className="mall"
                        onChange={handMallChange}
                        value={mall}
                    />
                    {/* <Link to={`${location}/${mall}`}></Link> */}
                </div>
            </form>
            <div className="header-image">
                <img src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" alt="" />

            </div>
        </header>



    );
}

export default NavBar