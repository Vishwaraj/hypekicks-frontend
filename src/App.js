
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Icon from "@mui/material/Icon";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { grey } from "@mui/material/colors";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState, createContext } from "react";
import { API } from "./global";
import { SingleProductPage } from "./components/single-product-page/SingleProductPage";
import { LandingPage } from "./components/landing page/LandingPage";
import { LoginPage } from "./components/login-page/LoginPage";
import { SignUpPage } from "./components/signup-page/SignUpPage";
import { HomePage } from "./components/home-page/HomePage";
import { CartPage } from "./components/cart-page/CartPage";
import { BillingDetailsPage } from "./components/billing-details-page/BillingDetailsPage";
import { ProfilePage } from "./components/profile-page/ProfilePage";
import { ProfileOrdersPage } from "./components/profile-orders-page/ProfileOrdersPage";
import { ProfileAddressPage } from "./components/profile-address-page/ProfileAddressPage";
import { ProfileAccountDetailsPage } from "./components/profile-account-details-page/ProfileAccountDetailsPage";
import { OrderSuccessPage } from "./components/order-success-page/OrderSuccessPage";





export const globalContext = createContext();

function App() {
  //cart context here

  const [cart, setCart] = useState([]);
  //  const [userAddress, setUserAddress] = useState({})
  const [user, setUser] = useState({});

  const fetchCart = () => {

    const user = window.localStorage.getItem('user');

    try {
      fetch(`${API}/cart`, {
        method: 'POST',
        body: JSON.stringify({user: user}),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then((result) => result.json())
        .then((data) => {
          setCart(data);
        });
    } catch (error) {
      console.log(error);
    }
  };


  //function to add orders
  const addOrders = () => {
    const username = window.localStorage.getItem("user");

    fetch(`${API}/cart/order-success`, {
      method: "POST",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div>
        {/* wrap it here */}
        <globalContext.Provider
          value={{ cart, setCart, user, setUser, fetchCart, addOrders }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/home/:category" element={<HomePage />} />
            <Route
              path="/home/single-product/:productID"
              element={<SingleProductPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/cart/billing-details"
              element={<BillingDetailsPage />}
            />
            <Route path="/cart/order-success" element={<OrderSuccessPage />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route
              path="/profile-page/orders"
              element={<ProfileOrdersPage />}
            />
            <Route
              path="/profile-page/addresses"
              element={<ProfileAddressPage />}
            />
            <Route
              path="/profile-page/account-details"
              element={<ProfileAccountDetailsPage />}
            />
          </Routes>

          <Footer />
        </globalContext.Provider>
        {/* Till here */}
      </div>
    </>
  );
}

export default App;


