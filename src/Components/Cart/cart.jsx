// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  cartCount:0,
  userlogin:false
};

const cartReducer = (state, action) => {
  //console.log(state,action)
  //console.log(action.type)
  switch (action.type) {
    case 'ADD_TO_CART':
      let existingItemIndex = 0;
      let updatedCart = []
      if(localStorage.getItem('mallData')===null)
      {
          existingItemIndex= state.cartItems.findIndex(
          (item) => item.foodid === action.payload.foodid
        );
        updatedCart = [...state.cartItems];
        //console.log("....")
        //console.log(updatedCart)
      }
      else{
        existingItemIndex = JSON.parse(localStorage.getItem('mallData')).findIndex(
          (item) => item.foodid === action.payload.foodid);
          updatedCart = [...JSON.parse(localStorage.getItem('mallData'))]
      }
      
        //console.log(existingItemIndex)
      if (existingItemIndex !== -1) {
        //const 
        //console.log(updatedCart)
        updatedCart[existingItemIndex].quantity += 1;
        updatedCart[existingItemIndex].price = updatedCart[existingItemIndex].quantity*updatedCart[existingItemIndex].foodcost
        //console.log(updatedCart)
        const updatedCartCount = parseInt(localStorage.getItem('cartCount'),0)+ 1;
        localStorage.setItem('cartCount', updatedCartCount.toString());
        localStorage.setItem('mallData', JSON.stringify(updatedCart));
        return { ...state, cartItems: updatedCart,cartCount:updatedCartCount};
      } else {
        const updatedCartCount = state.cartCount + 1;
        localStorage.setItem('cartCount', updatedCartCount.toString());
        localStorage.setItem('mallData', JSON.stringify([...state.cartItems, { ...action.payload, quantity: 1,price:action.payload.foodcost }]));
        // localStorage.setItem(action.payload.foodid, JSON.stringify(state.cartItems));
        return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1,price:action.payload.foodcost }],cartCount:updatedCartCount };
      }

    case 'REMOVE_FROM_CART':
      let existingItemInCart = 0
        //console.log(existingItemInCart)
        let updatedCart1 = []
        if(localStorage.getItem('mallData')===null)
        {
          existingItemInCart= state.cartItems.findIndex(
            (item) => item.foodid === action.payload.foodid
          );
          updatedCart1 = [...state.cartItems];
        }
        else{
          existingItemInCart = JSON.parse(localStorage.getItem('mallData')).findIndex(
            (item) => item.foodid === action.payload.foodid);
            updatedCart1 = [...JSON.parse(localStorage.getItem('mallData'))]
        }
      
        //const updatedCart1 = [...state.cartItems];
        updatedCart1[existingItemInCart].price = updatedCart1[existingItemInCart].foodcost*(updatedCart1[existingItemInCart].quantity-1)
        updatedCart1[existingItemInCart].quantity -= 1;
        //console.log(updatedCart1[existingItemInCart].quantity)
        if(updatedCart1[existingItemInCart].quantity>0){
          const updatedCartCount = state.cartCount - 1;
          localStorage.setItem('cartCount', updatedCartCount.toString());
          localStorage.setItem('mallData', JSON.stringify(updatedCart1));
          return { ...state, cartItems: updatedCart1, cartCount:updatedCartCount };}
      else
      {
        const updatedCartCount = state.cartCount-1;
        localStorage.setItem('cartCount', updatedCartCount.toString());
        const updatedCart1 = state.cartItems.filter((item) => item.foodid !== action.payload.foodid);
        localStorage.setItem('mallData', JSON.stringify(updatedCart1));
        return { ...state, cartItems: updatedCart1,cartCount:updatedCartCount };
      }
      case'EMPTY_CART':
      {
        state.cartItems = []
        return {...state,cartCount:0}
      }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
