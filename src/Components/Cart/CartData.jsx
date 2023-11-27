import React, { useEffect, useState } from 'react'
import { useCart } from './cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import cartCount from '../Cart/cartCount.css'
import { useNavigate } from 'react-router-dom';

function CartData() {
    const { state } = useCart(); // Access cart state
    const navigate = useNavigate()
    const [cartLength, setCartLength] = useState(0)
    //console.log(state)

    useEffect(()=>{
      let cartCount = localStorage.getItem('cartCount')
      //console.log(state.cartItems)//?.restaurantdetails?.restaurantid)
      //console.log(cartCount)
      if(cartCount===null)
      {
        setCartLength(0)
      }
      else{
      setCartLength(cartCount)
      }
      // //console.log(cartCount)
      // cartCount = JSON.parse(cartCount)
      // cartCount = cartCount.length
      //return cartCount
      //localStorage.setItem('CartData',state.cartItems.length)
      //const count = localStorage.getItem('CartData')
      //if(count!== null)
     
  },[state.cartItems,cartLength])

    const showCartPage = () =>{
        if(localStorage.getItem('cartCount')===0 || localStorage.getItem('cartCount')===null || localStorage.getItem('cartCount')==='0' )
        {
            alert('Your cart is empty!')
        }
        else
        {
            navigate('/checkout')
        }
    }

  return (
    <div className="cart-icon">
    <ShoppingCartIcon onClick = {showCartPage} className="fas fa-shopping-cart"/>
    <span className="cart-item-count">{cartLength}</span>
    </div>
  )
}

export default CartData