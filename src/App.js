
import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Icon from "@mui/material/Icon";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, useParams } from "react-router-dom";
import { Header } from "./Header";
import { ImageCarousel } from "./ImageCarousel";
import { Services } from "./Services";
import { ReviewArea } from "./ReviewArea";
import { Footer } from "./Footer";
import HypeKicks from "./images/Hype Kicks.png";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { grey } from "@mui/material/colors";
import { SideBar, SearchBar, ProductsList } from "./SideBar";
import { SelectChangeEvent } from "@mui/material/Select";
import { CartProductList } from "./CartProductList";
import { CartBilling } from "./CartBilling";
import { CartAddressBilling } from "./CartAddressBilling";
import { CartAddressProduct } from "./CartAddressProduct";
import { BillingAddress } from "./BillingAddress";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ProfileDashboard } from "./ProfileDashboard";
import { OrderList } from "./OrderList";
import { ProfileAddressForm } from "./ProfileAddressForm";
import { useEffect, useState, createContext, useContext, useLayoutEffect, useRef } from "react";
import { API } from "./global";
import { SingleProductPage } from "./SingleProductPage";
import { CartAddressProductList } from "./CartAddressProduct";
import fireworks from "./images/fireworks.png";
import { ProfileAccountForm } from "./ProfileAccountForm";




export const globalContext = createContext();

function App() {
  //cart context here

  const [cart, setCart] = useState([]);
  //  const [userAddress, setUserAddress] = useState({})
  const [user, setUser] = useState({});

  const fetchCart = () => {
    try {
      fetch(`${API}/cart`)
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

function LandingPage() {



  return (
    <div>
      <ImageCarousel />
      <Services />
      <ReviewArea />
    </div>
  );
}

function LoginPage() {
  return (
    <div className="login-page">
      <img src={HypeKicks} alt="logo" />
      <LoginForm />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="sign-up-page">
      <h1>Create New Account</h1>
      <SignUpForm />
    </div>
  );
}

function HomePage() {
  const { category } = useParams();

  const [homeProducts, setHomeProducts] = useState([]);

  const getProducts = async () => {
    fetch(`${API}/home`)
      .then((result) => result.json())
      .then((data) => {
        setHomeProducts(data);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const navigate = useNavigate();

  const getSpecificProducts = async (type) => {
    fetch(`${API}/home/${type}`)
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setHomeProducts(data);
      })
      .then(() => navigate("/home/" + type));
  };

  const [clicked, setClicked] = useState(false);

  const handleClick = async (event) => {
    let type = event.currentTarget.value;
    getSpecificProducts(type);
  };

  return (
    <div className="home-page">
      <SideBar
        handleClick={handleClick}
        clicked={clicked}
        setClicked={setClicked}
      />
      <div className="search-product-area">
        <SearchBar />
        <ProductsList homeProducts={homeProducts} />
      </div>
    </div>
  );
}

function CartPage() {
  const { cart, setCart, fetchCart } = useContext(globalContext);

  useEffect(() => {
    fetchCart();
  }, []);

  let sum;
  cart.forEach((product) => {
    sum += product.price * product.quantity;
  });

  const [total, setTotal] = useState(sum);

  return (
    <div>
      <h1 className="cart-title">Cart</h1>
      <div className="cart-body">
        {cart.length === 0 ? (
          <h1 style={{ marginRight: "36rem" }}>Cart is empty</h1>
        ) : (
          <CartProductList fetchCart={fetchCart} setTotal={setTotal} />
        )}

        <CartBilling total={total} setTotal={setTotal} />
      </div>
    </div>
  );
}

function BillingDetailsPage() {
  const { cart } = useContext(globalContext);

  const username = window.localStorage.getItem("user");

  const [form, setForm] = useState(null);

  const getAddressData = () => {
    fetch(`${API}/cart/billing-details`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setForm(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAddressData();
  }, []);

  return (
    <div>
      <h1 id="cart-address-title">Billing Details</h1>
      <div className="cart-address-body">
        {form ? <BillingAddress form={form} /> : <h1>Loading...</h1>}

        <div className="cart-address-billing">
          <CartAddressProductList />

          <CartAddressBilling />
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="profile-body">
      <ProfileSideBar />
      <div className="profile-area">
        <ProfileDashboard />
      </div>
    </div>
  );
}

function ProfileSideBar() {
  const navigate = useNavigate();

  const sideBarButton = {
    fontSize: "1.3rem",
  };

  return (
    <div class="profile-sidebar">
      {/* <h4><a href="profile.html">Dashboard</a></h4> */}
      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page")}
        variant="text"
        color="inherit"
      >
        Dashboard
      </Button>

      {/* <h4><a href="profile-orders.html">Orders</a></h4> */}
      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page/orders")}
        variant="text"
        color="inherit"
      >
        Orders
      </Button>

      {/* <h4><a href="profile-addresses.html">Addresses</a></h4> */}
      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page/addresses")}
        variant="text"
        color="inherit"
      >
        Addresses
      </Button>

      {/* <h4><a href="profile-account-details.html">Account Details</a></h4> */}
      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page/account-details")}
        variant="text"
        color="inherit"
      >
        Account Details
      </Button>

      {/* <h4>Log out</h4> */}
      <Button style={sideBarButton} variant="text" color="inherit">
        Log out
      </Button>
    </div>
  );
}

function ProfileOrdersPage() {
  return (
    <div className="profile-body">
      <ProfileSideBar />
      <div className="profile-area">
        <h3>Orders</h3>
        <OrderList />
      </div>
    </div>
  );
}

function ProfileAddressPage() {
  const addressStyle = {
    marginBottom: "2rem",
    marginLeft: "1rem",
  };

  return (
    <div className="profile-body">
      <ProfileSideBar />
      <div className="profile-area">
        <h3 style={addressStyle}>Billing Address</h3>
        <ProfileAddressForm />
      </div>
    </div>
  );
}

function ProfileAccountDetailsPage() {

  const user = window.localStorage.getItem('user');

  const [initialForm, setInitialForm] = useState(null)

  const getInitialForm = () => {
    fetch(`${API}/profile-page/account-details`, {
      method: 'POST',
      body: JSON.stringify({user: user}),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(result=> result.json())
    .then(data => {setInitialForm(data);})
    .catch(error => console.log(error))
  }

  useEffect(()=> {
     getInitialForm()
  }, [])


  return (
    <div className="profile-body">
      <ProfileSideBar />
      <div className="profile-area">
        <h3>Account Details</h3>
        { initialForm ? <ProfileAccountForm initialForm = {initialForm} /> : <h3>Loading...</h3>}
      </div>
    </div>
  );
}

function OrderSuccessPage() {
  const navigate = useNavigate();

  const { addOrders, setCart } = useContext(globalContext);

  const orderSuccessRef = useRef()


  useLayoutEffect(() => {
    if(!orderSuccessRef.current) {
       addOrders();
       setCart([]);
       console.log("Hello there");
       orderSuccessRef.current = true;
    }

  });





  console.log(orderSuccessRef.current);
  return (
    <>
      <div className="order-placed-modal">
        <img src={fireworks} alt="fire works" />
        <h1>Order has been placed successfully!</h1>
        <Button
          onClick={() => navigate("/home")}
          variant="outlined"
          color="inherit"
        >
          Continue Shopping
        </Button>
      </div>
    </>
  );
}
