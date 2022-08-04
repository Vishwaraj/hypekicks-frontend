
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Icon from '@mui/material/Icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, useParams} from "react-router-dom";
import { Header } from './Header';
import { ImageCarousel } from './ImageCarousel';
import { Services } from './Services';
import { ReviewArea } from './ReviewArea';
import { Footer } from './Footer';
import HypeKicks from './images/Hype Kicks.png';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { grey } from '@mui/material/colors';
import { SideBar, SearchBar, ProductsList } from './SideBar';
import { SelectChangeEvent } from '@mui/material/Select';
import { CartProductList } from './CartProductList';
import { CartBilling } from './CartBilling';
import { CartAddressBilling } from './CartAddressBilling';
import { CartAddressProduct } from './CartAddressProduct';
import { BillingAddress } from './BillingAddress';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { ProfileDashboard } from './ProfileDashboard';
import { OrderList } from './OrderList';
import { ProfileAddressForm } from './ProfileAddressForm';
import { TextField } from '@mui/material';
import { useEffect, useState, createContext, useContext,  } from 'react';
import {API} from './global'
import { SingleProductPage } from './SingleProductPage';
import {CartAddressProductList} from './CartAddressProduct'




export const globalContext = createContext()

function App() {

  //cart context here

 const [cart, setCart] = useState([]);
//  const [userAddress, setUserAddress] = useState({})
const [user, setUser] = useState({})


  return (
    <>
    
  <div>
  {/* wrap it here */}
  <globalContext.Provider value={{cart, setCart, user, setUser}}>

 
     <Header />
     <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/signup' element={<SignUpPage />}/>
      <Route path='/home' element={<HomePage />}/>
      <Route path='/home/:category' element={<HomePage />}/>
      <Route path='/home/single-product/:productID' element={<SingleProductPage />}/>
      <Route path='/cart' element={<CartPage />}/>
      <Route path='/cart/billing-details' element={<BillingDetailsPage />}/>
      <Route path='/profile-page' element={<ProfilePage />}/>
      <Route path='/profile-page/orders' element={<ProfileOrdersPage />} />
      <Route path='/profile-page/addresses' element={<ProfileAddressPage />} />
      <Route path='/profile-page/account-details' element={<ProfileAccountDetailsPage />} />
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
    <div className='login-page'>
    <img src={HypeKicks} alt='logo'/>
    <LoginForm />
    </div>
    
  );
}


function SignUpPage() {
  return (
    <div className='sign-up-page'>
    <h1>Create New Account</h1>
    <SignUpForm />
    </div>
    
  );
}



function HomePage() {

  const {category} = useParams()
  

  const [homeProducts, setHomeProducts] = useState([]);

  const getProducts = async () => {
    fetch(`${API}/home`)
    .then(result => result.json())
    .then(data => {setHomeProducts(data)});
  }

  useEffect(()=> {
  getProducts()
  }, [])

  const navigate = useNavigate();

  const getSpecificProducts = async (type) => {
    fetch(`${API}/home/${type}`)
    .then(result => result.json())
    .then(data => {console.log(data); setHomeProducts(data)})
    .then(() => navigate('/home/'+type))
    
  }

  const [clicked, setClicked] = useState(false);

  const handleClick = async (event) => {
    let type = event.currentTarget.value;
    getSpecificProducts(type);
  
  }
  



  return (
    <div className='home-page'>
    <SideBar handleClick={handleClick} clicked={clicked} setClicked={setClicked} />
    <div className='search-product-area'>
    <SearchBar />
    <ProductsList homeProducts={homeProducts} />
    </div>
    </div>
  );
}


function CartPage() {

  const {cart, setCart} = useContext(globalContext);



  const fetchCart = () => {
    try {
      fetch(`${API}/cart`)
      .then((result) => result.json())
      .then(data => {
        setCart(data);
      })
     } catch (error) {
        console.log(error)
     }
  }

  useEffect(() => {
    fetchCart();
    }, [])


    let sum;
    cart.forEach((product) => {
      sum += product.price * product.quantity
    })
  
    const [total, setTotal] = useState(sum);
    
  

  return (
    <div>
    <h1 className="cart-title">Cart</h1>
    <div className='cart-body'>
    {cart.length === 0 ? <h1 style={{marginRight: "36rem"}}>Cart is empty</h1> : <CartProductList fetchCart={fetchCart} setTotal={setTotal} />}
    
    <CartBilling total={total} setTotal={setTotal} />
    </div>
    </div>
  );
}


function BillingDetailsPage() {

  const {cart} = useContext(globalContext);
  console.log(cart);

  return (
    <div>
   <h1 id="cart-address-title">Billing Details</h1> 
   <div className='cart-address-body'>
   <BillingAddress />
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
    <div className='profile-body'>
    <ProfileSideBar/>
    <div className='profile-area'>
    <ProfileDashboard />
    </div>
    </div>
  )
}

function ProfileSideBar() {

  const navigate = useNavigate();

  const sideBarButton = {
    fontSize : '1.3rem'
  }

  return (
    <div class="profile-sidebar">
        {/* <h4><a href="profile.html">Dashboard</a></h4> */}
        <Button style={sideBarButton} onClick={() => navigate('/profile-page')} variant="text" color='inherit'>Dashboard</Button>
       
        {/* <h4><a href="profile-orders.html">Orders</a></h4> */}
        <Button style={sideBarButton} onClick={() => navigate('/profile-page/orders')} variant="text" color='inherit'>Orders</Button>
       
        {/* <h4><a href="profile-addresses.html">Addresses</a></h4> */}
        <Button style={sideBarButton} onClick={()=>navigate('/profile-page/addresses')} variant="text" color='inherit'>Addresses</Button>
       
        {/* <h4><a href="profile-account-details.html">Account Details</a></h4> */}
        <Button style={sideBarButton} onClick={()=>navigate('/profile-page/account-details')} variant="text" color='inherit'>Account Details</Button>
       
        {/* <h4>Log out</h4> */}
        <Button style={sideBarButton} variant="text" color='inherit'>Log out</Button>

    </div>
  );
}


function ProfileOrdersPage() {
  return (
    <div className='profile-body'>
    <ProfileSideBar/>
    <div className='profile-area'>
    <h3>Orders</h3>
    <OrderList />
    </div>
    </div>
  );
}


function ProfileAddressPage() {

  const addressStyle = {
    marginBottom: '2rem',
    marginLeft: '1rem'
  }

  return (
    <div className='profile-body'>
    <ProfileSideBar/>
    <div className='profile-area'>
    
    <h3 style={addressStyle}>Billing Address</h3>
      <ProfileAddressForm />

    </div>
    </div>
  );
}


function ProfileAccountDetailsPage () {
  return (
    <div className='profile-body'>
    <ProfileSideBar/>
    <div className='profile-area'>
    <h3>Account Details</h3>
    <ProfileAccountForm />
    </div>
    </div>
  );
}

function ProfileAccountForm () {

  const accDetailsName = {
    width: '30vw'
  }

  const accDetailsButton = {
    width: '100%',
    marginTop: '2rem'
  }

  return (
    <form class="account-details-form" action="">
    <div className="name">
    <TextField style={accDetailsName} id="outlined-basic" label="First Name" variant="outlined" />
    <TextField style={accDetailsName} id="outlined-basic" label="Last Name" variant="outlined" />
    </div>

    <div className="username-email">
    <TextField  id="outlined-basic" label="Username / Display Name" variant="outlined" />
    <TextField  id="outlined-basic" label="E-mail" variant="outlined" />
    </div>

    <div className="password-change">
       <h3>Change Password</h3>
       <TextField  id="outlined-basic" label="Current Password" variant="outlined" />
       <TextField  id="outlined-basic" label="New Password" variant="outlined" />
       <TextField  id="outlined-basic" label="Confirm New Password" variant="outlined" />
    </div>

    <Button style={accDetailsButton} variant='outlined' color='inherit'>Save Changes</Button>

    </form>
  );
}