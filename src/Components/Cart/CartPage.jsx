import React, { useState } from 'react';
import { useCart } from './cart'; // Import the useCart hook
import '../Cart/CheckoutPage.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Counter from '../FoodList/Counter';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Login from '../LoginPopup/login';
import { CookiesProvider, useCookies } from "react-cookie";
import { sendOrderDetails } from './cartDataService';
import NavBar from '../NavBar/NavBar';

const CartPage = () => {
  const { state } = useCart(); // Access cart state
  const [userlogin, setUserlogin] = useState(false)
  const [cookies, setCookie] = useCookies(["user"]);
  //console.log(state)


  //console.log(useCookies(["user"]))
  //console.log(cookies.user)
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const ref = useRef('')
  let timeofPlacingOrder = ''
  ////console.log(JSON.parse(localStorage.getItem(state.cartItems[0].restaurantdetails.malldetails.mallid)))
  let total_value = 0;
  JSON.parse(localStorage.getItem('mallData'))?.map((data) => {
    total_value = total_value + data.price
  })
  //console.log(localStorage.getItem('cartCount'))

  const addToCart = (item) => {
    //console.log('Added to cart:', item);
    dispatch({ type: 'ADD_TO_CART', payload: item });

  };

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const proceedToConfirmationPage = () => {

    if (cookies.user !== undefined) {
      const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const length = 12;
      //let result = '';

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        ref.current += characterSet.charAt(randomIndex);
      }
      timeofPlacingOrder = new Date().toLocaleString()
      //return result;

      let obj = {}
      obj['userid'] = cookies.user.userid
      obj['useremailid'] = cookies.user.emailid
      obj['timeofPlacingOrder'] = timeofPlacingOrder
      obj['menudetails'] = (localStorage.getItem('mallData'))
      obj['totalcost'] = total_value
      obj['orderid'] = ref.current

      //console.log(obj)
      sendOrderDetails(obj).then((data) => {
        //console.log(data)
        dispatch({ type: 'EMPTY_CART', payload: obj });
        navigate('/ordersummary')//, { state: [ref.current, timeofPlacingOrder, total_value] })
      })
      //navigate('/ordersummary', { state: [ref.current, timeofPlacingOrder, total_value] })
    }
    else {
      //console.log("-----------")
      setUserlogin(true)
    }


  }
  const gotDataFromLoginPage = (data) => {
    //console.log(data)
    //localStorage.setItem('user', JSON.stringify(data))
    setCookie('user', JSON.stringify(data))

    //setUserData(data)
    //setLogin(true)
  }

  const toggleLoginPage = () => {
    setUserlogin(false)
  }


  return (
    <>
      {/* <ArrowBackIcon /> */}
      {localStorage.getItem('cartCount') !== null && localStorage.getItem('cartCount') !== '0' ?
        <>
          <NavBar />
          <div>

            <h2 style={{ marginLeft: "-2.5%" }}>Shopping Cart</h2>
            <div className="shopping-cart">
              <div className="column-labels">
                <label className="product-details">Product</label>
                <label className="product-price">Price</label>
                <label className="product-quantity">Quantity</label>
                <label className="product-line-price">Total</label>
              </div>
              <>
                {JSON.parse(localStorage.getItem('mallData')).map((cartItem) => (

                  <div className="product" key={cartItem.foodid}>
                    
                      <div className="restaurant-name" style={{ fontSize: 'x-large', fontWeight: 'bolder', paddingBottom: '4%' }}>
                        {cartItem.restaurantdetails.restaurantname}
                      </div>
                    <div className="product-details">
                      <div className="product-title">{cartItem.foodheader} </div>
                      <p className="product-description">{cartItem.fooddescription}</p>
                    </div>
                    <div className="product-price">&#8377;{cartItem.foodcost}</div>
                    <div className="product-quantity">
                      <div >{cartItem.quantity}</div>
                    </div>
                    <div className="product-removal">
                      {/* <button className="remove-product">
              Remove
            </button> */}
                      <Counter item={cartItem} addToCart={addToCart} removeFromCart={removeFromCart} />
                    </div>
                    <div className="product-line-price">&#8377;{cartItem.price}</div>
                  </div>
                ))}

              </>
              <hr />
              <p style={{ color: 'purple', fontWeight: 'bold' }}> Grand total &#8377;{total_value}</p>
              <button className="checkout" onClick={proceedToConfirmationPage}
                disabled={(JSON.parse(localStorage.getItem('mallData'))).length === 0}
              >Place order</button>
            </div>
          </div>
        </>
        : <div>No order found</div>}
      <>
        {userlogin && <Login onClose={toggleLoginPage} callBackEvent={gotDataFromLoginPage} />}
      </>
    </>
  )
}

export default CartPage;
/*<div>
      <h2>Shopping Cart</h2>
      <ul>
        {state.cartItems.map((cartItem) => (
          <li key={cartItem.foodid}>
            {cartItem.foodheader} : {cartItem.quantity} : {cartItem.price}
          </li>
        ))}
      </ul>
    </div> */