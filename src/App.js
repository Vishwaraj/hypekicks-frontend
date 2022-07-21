
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Icon from '@mui/material/Icon';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route} from "react-router-dom";
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
import { ProductBody } from './ProductBody';
import { RelatedProducts } from './RelatedProducts';
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







function App() {
  return (
    <div>
     <Header />
     <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/signup' element={<SignUpPage />}/>
      <Route path='/home' element={<HomePage />}/>
      <Route path='/home/single-product' element={<SingleProductPage />}/>
      <Route path='/cart' element={<CartPage />}/>
      <Route path='/cart/billing-details' element={<BillingDetailsPage />}/>
      <Route path='/profile-page' element={<ProfilePage />}/>
      <Route path='/profile-page/orders' element={<ProfileOrdersPage />} />
      <Route path='/profile-page/addresses' element={<ProfileAddressPage />} />
      <Route path='/profile-page/account-details' element={<ProfileAccountDetailsPage />} />
     </Routes>
     
     <Footer />
    </div>
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
  return (
    <div className='home-page'>
    <SideBar />
    <div className='search-product-area'>
    <SearchBar />
    <ProductsList />
    </div>
    </div>
  );
}


function SingleProductPage() {
  return (
    <div>
    <ProductBody />
    <div className='related-products'>
    <h1>Related Products</h1>
    <div className='related-product-cards'>
    <RelatedProducts />
    <RelatedProducts />
    <RelatedProducts />
    <RelatedProducts />
    </div>
    </div>
    </div>  
  );
}

function CartPage() {
  return (
    <div>
    <h1 className="cart-title">Cart</h1>
    <div className='cart-body'>
    <CartProductList />
    <CartBilling />
    </div>
    </div>
  );
}


function BillingDetailsPage() {
  return (
    <div>
   <h1 id="cart-address-title">Billing Details</h1> 
   <div className='cart-address-body'>
   <BillingAddress />
   <div className="cart-address-billing">
   <CartAddressProduct />
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