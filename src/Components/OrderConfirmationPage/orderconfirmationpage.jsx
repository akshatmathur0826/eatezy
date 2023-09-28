import React, { useState, useEffect } from 'react';
import { useCart } from '../Cart/cart';
import ProgressBar from './ProgressBar';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { viewOrderDetails } from './orderConfirmationPageService';
import NavBar from '../NavBar/NavBar';

function OrderConfirmation() {
  const [orderStatus, setOrderStatus] = useState('Accepted');
  const [orderId, setOrderId] = useState('');
  const [cookies,setCookies] = useCookies('user')
  const [orderDetails, setOrderDetails] = useState(null)
  const { state } = useCart();
  const data = useLocation();
  console.log(data.state)
  console.log(state)
  console.count()
  

  useEffect(() => {
    viewOrderDetails(cookies.user.emailid).then((data)=>{
      data['menudetails'] = JSON.parse(data['menudetails'])
      setOrderDetails((data))
      console.log(orderDetails)
    })
    const simulateOrderPlacement = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const generatedOrderId = Math.floor(Math.random() * 10000);
      setOrderId(generatedOrderId);
      setOrderStatus('In Process');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setOrderStatus('Ready');
    };

    
    localStorage.clear()
    
    //viewOrderDetails()
    simulateOrderPlacement();
    
  }, []);

  let prevRestaurantName = null;

  return (
    <div>
      <NavBar/>
      <h4 style={{fontWeight:'bold',fontSize:'larger',
    fontFamily: 'Courier New, Courier, monospace'}}>Order Details</h4>
      <hr/>
      <div className="column-labels">
        <label className="product-details">Product</label>
        <label className="product-price">Price</label>
        <label className="product-quantity">Quantity</label>
        <label className="product-line-price">Total</label>
      </div>
      <>
      {orderDetails!==null?
      <>
        {orderDetails.menudetails.map((cartItem) => {
          const { foodheader, quantity, price } = cartItem;
          const restaurantname = cartItem.restaurantdetails.restaurantname
          console.log(foodheader,quantity,restaurantname)
          
          const displayRestaurantName = prevRestaurantName !== restaurantname;
          prevRestaurantName = restaurantname;

          return (
            <div className="product" key={cartItem.foodid}>
              {displayRestaurantName && (
                <div className="restaurant-name" style={{fontSize:'x-large', fontWeight:'bolder', paddingBottom:'4%'}}>{restaurantname}</div>
              )}
              <div className="product-details">
                <div className="product-title1">{foodheader}</div>
              </div>
              <div className="product-price">&#8377;{cartItem.foodcost}</div>
              <div className="product-quantity">
                <div>{quantity}</div>
              </div>
              <div className="product-line-price">&#8377;{price}</div>
              
             
            </div>
          );
        })}
        <br/>
          <p style={{color:'purple',fontWeight:'bold'}}>Grand Total: &#8377;{orderDetails.totalcost}</p>
        <br/>
        <hr/>
         <div >
                <h6 style={{fontWeight:'bold', color:'grey'}}> Order Id: {orderDetails.orderid}</h6>
                <h6 style={{fontWeight:'bold', color:'grey'}}> Order Placed: Dine in</h6>
                <h6 style={{fontWeight:'bold', color:'grey'}}> Order Placed On: {orderDetails.timeofPlacingOrder}</h6>
              </div>
        </>:<></>}
        
              {/* <ProgressBar initialStatus = {'accepted'}/> */}
      </>
      
    </div>
  );
}

export default OrderConfirmation;
/*{orderDetails!==null?
      <>
        {orderDetails.map((cartItem) => {
          const { foodheader, quantity, price } = cartItem;
          const restaurantname = cartItem.restaurantdetails.restaurantname
          console.log(foodheader,quantity,restaurantname)
          
          const displayRestaurantName = prevRestaurantName !== restaurantname;
          prevRestaurantName = restaurantname;

          return (
            <div className="product" key={cartItem.foodid}>
              {displayRestaurantName && (
                <div className="restaurant-name" style={{fontSize:'x-large', fontWeight:'bolder', paddingBottom:'4%'}}>{restaurantname}</div>
              )}
              <div className="product-details">
                <div className="product-title1">{foodheader}</div>
              </div>
              <div className="product-price">&#8377;{cartItem.foodcost}</div>
              <div className="product-quantity">
                <div>{quantity}</div>
              </div>
              <div className="product-line-price">&#8377;{price}</div>
              
             
            </div>
          );
        })}
        </>:<></>}
        <br/>
     */