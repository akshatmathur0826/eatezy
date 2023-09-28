import React, { useState, useEffect, useMemo, useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../Cart/cart';

const counterContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const counterButtonsStyle = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '16px',
};

const buttonStyle = {
  width: '5px',
  fontSize: '0.5rem'
};

const valueStyle = {
  fontSize: '1.2rem',
  margin: '0 10px',
};

const Counter = ({ item }) => {
  console.log(item)
  const { state, dispatch } = useCart();
  const cartItem = state.cartItems.find((cartItem) => cartItem.foodid === item.foodid);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const [count, setCount] = useState(0);
  const ref = useRef(0)
  useEffect(() => {
    // Initialize the local count state with the quantity in the cart
    //setCount(quantityInCart);
    const storedCount = localStorage.getItem(`R${item.foodid}`);
    if (storedCount !== null) {
      setCount(parseInt(storedCount, 0));
    }
  }, [item.foodid]);
console.log(ref)
  // Use useMemo to memoize the component
  const updateCount = (newCount) => {
   
    setCount(newCount); // Update the local state with the new count
    localStorage.setItem(`R${item.foodid}`, newCount.toString()); // Update localStorage with the new count
  };

  const memoizedComponent = useMemo(() => {
    const addToCart = () => {
      dispatch({ type: 'ADD_TO_CART', payload: item });
      const newCount = count + 1; // Calculate the new count
      updateCount(newCount); 
      //setCount(count + 1);
    };

    const removeFromCart = () => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item });
      // if (count > 0) {
      //   setCount(count - 1);
      // }
      if (count > 0) {
        const newCount = count - 1; // Calculate the new count
        updateCount(newCount); // Call updateCount to update the count in both state and localStorage
      }
    };

    return (
      <div style={counterContainerStyle}>
        <div style={counterButtonsStyle}>
          <Button
            style={buttonStyle}
            variant="outlined"
            color="primary"
            onClick={removeFromCart}
            disabled={count === 0}
          >
            <RemoveIcon />
          </Button>
          <Typography style={valueStyle}>{count}</Typography>
          <Button
            style={buttonStyle}
            variant="outlined"
            color="primary"
            onClick={addToCart}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }, [count, dispatch, item, quantityInCart]);

  return memoizedComponent;
};

export default Counter;
