import React, { useState, useEffect, useRef } from 'react';
//import { useCart } from '../Cart/cart';
import ProgressBar from './ProgressBar';
//import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { viewOrderDetails } from './orderConfirmationPageService';
import NavBar from '../NavBar/NavBar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { io } from "socket.io-client"




function OrderConfirmation() {
  const [orderStatus, setOrderStatus] = useState('');
  // const [orderId, setOrderId] = useState('');
  const [cookies, setCookies] = useCookies('user')
  const [orderDetails, setOrderDetails] = useState(null)
  const shareDatabetweenUseEffects = useRef();
  //const { state } = useCart();
  //const data = useLocation();
  ////console.log(data.state)
  ////console.log(state)
  //console.count()

  const baseURL = process.env.NODE_ENV === "production"
  ? "https://eatezyrestouser.onrender.com"
  : "http://localhost:4009";

  const socket = io(baseURL);



  const setViewOfOrderDetailsProperly = async (orderedData) => {

    //console.log(orderedData)
    const foodsByRestaurant = {};
    orderedData.forEach(orderedData => {
      const restaurantName = orderedData.restaurantdetails.restaurantname;

      // If the restaurant name is not a key in the object, create an array for it
      if (!foodsByRestaurant[restaurantName]) {
        foodsByRestaurant[restaurantName] = [];
      }
      // Add the food item to the array for the respective restaurant
      foodsByRestaurant[restaurantName].push(orderedData);
    })
    return foodsByRestaurant
  }

  const viewOrderData = async (emailId) => {
    // ... (implementation of viewOrderDetails function)

    viewOrderDetails(emailId).then((data) => {

      //console.log(data)
      let menuDetailsofResto = JSON.parse(data['menudetails']);
      //console.log(menuDetailsofResto);
      shareDatabetweenUseEffects.current = menuDetailsofResto
      const orderData = JSON.stringify(data);

      //console.log(data['menudetails'].length);
     // setTimeout(() => {
      for (var i = 0; i < menuDetailsofResto.length; i++) {
        //console.log(i);
        
          socket.emit('join-room', menuDetailsofResto[i].restaurantdetails.restaurantid);
        socket.emit(data.orderid, orderData, menuDetailsofResto[i].restaurantdetails.restaurantid);
      }
    //}, 2000);

      setViewOfOrderDetailsProperly(menuDetailsofResto).then((foodsByRestaurant) => {
        //console.log(foodsByRestaurant);
        menuDetailsofResto = { ...foodsByRestaurant };
        data['menudetails'] = menuDetailsofResto;
        //console.log(data.menudetails['Lord Forklore'][0].restaurantdetails);
        setOrderDetails(data);
      });

    })
    return shareDatabetweenUseEffects.current;
  }

  useEffect(() => {
    //console.log("OrderConfirmation component mounted");

    socket.on('connect', () => {
      //console.log(`Connected to server with id: ${socket.id}`);
      ////console.log(data.orderid)
    });

    socket.emit('useremailid',cookies.user.emailid)

    const fetchData = async () => {
      try {
        const data = await viewOrderData(cookies.user.emailid);
        //console.log(data)
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchData();
    localStorage.clear();
  }, []);

  useEffect(() => {
    //console.log("&&&&&&&");



    socket.on('send', (statusFromResto, room) => {
      //console.log("########");

      if (shareDatabetweenUseEffects.current !== undefined) {
        //console.log(shareDatabetweenUseEffects.current)
        let menuDetailsofResto = shareDatabetweenUseEffects.current;
        //console.log(menuDetailsofResto);
        // Handle data received from the second client
        for (let i = 0; i < menuDetailsofResto.length; i++) {
          ////console.log(menuDetailsofResto.restaurantdetails)
          if (menuDetailsofResto[i].restaurantdetails.restaurantid === room) {
            menuDetailsofResto[i].restaurantdetails['status'] = statusFromResto;
          }
        }
        //console.log(menuDetailsofResto);
        //console.log(orderDetails === null)
      }
      setOrderStatus(statusFromResto);
      //console.log(statusFromResto);
    });

  }, [orderStatus])


  return (
    <div>
      <NavBar />
      <h4 style={{
        fontWeight: 'bold', fontSize: 'larger',
        fontFamily: 'Courier New, Courier, monospace'
      }}>Order Details</h4>
      <hr />
      <div className="column-labels">
        <div className="product-details">
          <label className='product-title'>Product</label>
        </div>

        <label className="product-price">Price</label>
        <label className="product-quantity">Quantity</label>
        <label className="product-line-price">Total</label>
      </div>
      <>
        {orderDetails !== null ? (
          <>
            {Object.keys(orderDetails.menudetails).map((key) => (
              <div key={key}>
                {/* <h3>--------------</h3>
                <h4>{orderDetails.menudetails[key][0].restaurantdetails?.status}</h4> */}
                {orderDetails?.menudetails[key][0]?.restaurantdetails?.status === undefined?
                <ProgressBar initialStatus={'waittoaccept'} key={key} />
                :
                <ProgressBar initialStatus={orderDetails?.menudetails[key][0]?.restaurantdetails?.status} key={key} />
                }
                {/* <ProgressBar initialStatus={orderDetails?.menudetails[key][0]?.restaurantdetails?.status} key={key} /> */}
                <div className="restaurant-name" style={{ fontSize: 'x-large', fontWeight: 'bolder', paddingBottom: '4%' }}>{key}</div>
                {orderDetails.menudetails[key].map((data) => (
                  <div className="product" key={data.foodid}>
                    <div className="product-details">
                      <div className="product-title1">{data.foodheader}</div>
                    </div>
                    <div className="product-price">&#8377;{data.foodcost}</div>
                    <div className="product-quantity">
                      <div>{data.quantity}</div>
                    </div>
                    <div className="product-line-price">&#8377;{data.price}</div>
                  </div>
                ))}
              </div>
            ))}

            <br />
            <p style={{ color: 'purple', fontWeight: 'bold' }}>Grand Total: &#8377;{orderDetails.totalcost}</p>
            <br />
            <hr />
            <div>
              <h6 style={{ fontWeight: 'bold', color: 'grey' }}> Order Id: {orderDetails.orderid}</h6>
              <h6 style={{ fontWeight: 'bold', color: 'grey' }}> Order Placed: Dine in</h6>
              <h6 style={{ fontWeight: 'bold', color: 'grey' }}> Order Placed On: {orderDetails.timeofPlacingOrder}</h6>
            </div>
          </>
        ) : (
          <><Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box></>
        )}

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
          //console.log(foodheader,quantity,restaurantname)
          
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