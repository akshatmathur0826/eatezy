import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import '../OrderHistory/orderHistory.css'

export const OrderHistory = () =>{
    const orderhistorydata = useLocation()
    console.log(orderhistorydata.state)
    orderhistorydata.state.map((data)=>{
        console.log(data.restaurantdetails)
    })
    return(
    <>
    <NavBar/>
    <div className="container-3">
        <h4 className="heading-3">Order History</h4>
        <hr />
        {orderhistorydata ? (
          <div>
            {orderhistorydata.state.map((data, index) => (
              <div key={index} className="orderItem">
                <div className="orderInfo">
                  <span>Order ID:</span>
                  <span>{data.orderid}</span>
                </div>
                <div className="orderInfo">
                  <span>Total Amount:</span>
                  <span>&#8377;{data.totalcost}</span>
                </div>
                <div className="orderInfo">
                  <span>Ordered On:</span>
                  <span>{data.timeofPlacingOrder}</span>
                </div>
                <div className="orderDetails-3">
                  <span>Items:</span>
                  {JSON.parse(data.menudetails).map((data1) => (
                    <div key={data1.foodheader}>
                      <span>{data1.quantity} x {data1.foodheader}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No order history available.</p>
        )}
      </div>
    </>)
}