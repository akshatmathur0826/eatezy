import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import Counter from './Counter';
import '../FoodList/foodlist.css'
import { useCart } from '../Cart/cart'; // Import the useCart hook
import CartPage from '../Cart/CartPage';

const FoodList = (props) => {
  const [data, setData] = useState([]);
  const { dispatch } = useCart(); // Access the cart context's dispatch function

  function groupMenuItemsByCategory(menuData) {
    const groupedData = {};
    menuData.forEach((item) => {
      if (!groupedData[item.foodcategoryid]) {
        groupedData[item.foodcategoryid] = {
          category: item.foodcategoryname,
          items: [],
        };
      }
      groupedData[item.foodcategoryid].items.push(item);
    });
    return Object.values(groupedData);
  }

  useEffect(() => {
    setData(groupMenuItemsByCategory(props.menuItems));
  }, [props.menuItems]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
    //console.log('Added to cart:', item);
  };

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  return (
    <>
    <div className="popup">
      <div className="popup-inner">
        {/* ... */}
        <div className="d-flex flex-wrap flex-direction-row vertical-center justify-content-space-between">
                    <div className="title">
                        <h1>Order Online</h1>
                    </div>
                    <ClearIcon className="close-btn" onClick={() => props.setTrigger(false)} />
                </div>
                <br/>
                <br/>
                <br/>
        <div>
          {data.map((category) => (
            <div key={category.category}>
              <h2>{category.category}</h2>
              {category.items.map((item) => (
                <div key={item.foodid} className="food-item-container">
                  <div className="food-item-details">
                    <h4>{item.foodheader}</h4>
                    <p>{item.fooddescription}</p>
                    <p>&#8377;{item.foodcost}</p>
                  </div>
                  <Counter item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* <CartPage/> */}
    </>
  );
};

export default FoodList;
