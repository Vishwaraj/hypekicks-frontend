
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
import AdminPortalPage from "./components/admin-pages/admin-portal-page/AdminPortalPage";
import AdminSignUpPage from "./components/admin-pages/admin-sign-up-page/AdminSignUpPage";
import AdminLoginPage from "./components/admin-pages/admin-login-page/AdminLoginPage";
import AdminDashboardPage from "./components/admin-pages/admin-dashboard-page/AdminDashboardPage";
import AdminUsersPage from "./components/admin-pages/admin-users-page/AdminUsersPage";
import AdminOrdersPage from "./components/admin-pages/admin-orders-page/AdminOrdersPage";
import AdminProductsPage from "./components/admin-pages/admin-products-page/AdminProductsPage";
import AdminProductsAllSneakersPage from "./components/admin-pages/admin-products-all-sneakers-page/AdminProductsAllSneakersPage";
import AdminProductsAddSneakerPage from "./components/admin-pages/admin-products-add-sneakers-page/AdminProductsAddSneakerPage";
import AdminProductsUpdateSneakersPage from "./components/admin-pages/admin-products-update-sneakers-page/AdminProductsUpdateSneakersPage";





export const globalContext = createContext();

function App() {
  //cart context here
  const [cart, setCart] = useState([]);
  //  const [userAddress, setUserAddress] = useState({})
  const [user, setUser] = useState({});

  const fetchCart = () => {

    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');

    try {
      fetch(`${API}/cart`, {
        method: 'POST',
        body: JSON.stringify({user: user}),
        headers: {
          "Content-type": "application/json",
          "auth-token": token
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
    const token = window.localStorage.getItem('token');

    fetch(`${API}/cart/order-success`, {
      method: "POST",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      },
    })
      .then((result) => result.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  // `data:image/jpeg;base64,${data}`

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

            {/* admin routes */}
            <Route path='/admin-portal' element={<AdminPortalPage />} />
            <Route path='/admin/sign-up' element={<AdminSignUpPage />} />
            <Route path='/admin/login' element={<AdminLoginPage />} />
            <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
            <Route path='/admin/users' element={<AdminUsersPage />} />
            <Route path='/admin/orders' element={<AdminOrdersPage />} />
            <Route path='/admin/products' element={<AdminProductsPage />} />
            <Route path='/admin/products/all-sneakers' element={<AdminProductsAllSneakersPage />} />
            <Route path='/admin/products/add-sneakers' element={<AdminProductsAddSneakerPage />} />
            <Route path='/admin/products/update-sneakers/:id' element={<AdminProductsUpdateSneakersPage />} />
          </Routes>

          <Footer />
        </globalContext.Provider>
        {/* Till here */}
      </div>
    </>
  );
}

export default App;


