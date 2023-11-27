import logo from './logo.svg';
import './App.css';
import HomeScreen from './Components/HomeScreen/Homepage';
import RestaurnatList from './Components/RestaurantList/restaurantList';
import { Route,Routes,Navigate } from 'react-router-dom';
import CartPage from './Components/Cart/CartPage';
import OrderConfirmation from './Components/OrderConfirmationPage/orderconfirmationpage';
import { CookiesProvider, useCookies } from "react-cookie";
import ErrorPage from './Components/errorPage/errorPage';
import { OrderHistory } from './Components/OrderHistory/orderHistory';

function App() {
  return (
    <CookiesProvider>
    <Routes>
    <Route path="/" element={<HomeScreen />} exact />
    <Route path="/:location/:mall" element={<RestaurnatList />} exact/>
    <Route path="/checkout" element={<CartPage/>} exact/>
    <Route path="/ordersummary" element={<OrderConfirmation/>} exact/>
    <Route path="/orderhistory" element={<OrderHistory/>} exact/>
    <Route path="/error" element={<ErrorPage/>} exact/>
    {/* <Route path="//:mall" element={<Navigate to="/error" />} /> */}
    <Route path="/*" element={<Navigate to="/error" />} />
  </Routes>
  </CookiesProvider>

  );
}

export default App;
