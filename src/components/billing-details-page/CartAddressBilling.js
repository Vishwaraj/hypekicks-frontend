import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import {useContext, useState} from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import fireworks from '../../images/fireworks.png';
import { globalContext } from "../../App";
import { API } from "../../global";
import { Alert, Snackbar } from "@mui/material";



export function CartAddressBilling() {


  //state for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  
  //state for snackbar -->
  const [redirected, setRedirected] = useState(false);

  //getting cart from global context
  const {cart} = useContext(globalContext)

  //total price in cart code -->
  const total = cart.reduce((total, currentVal)=> total += currentVal.price*currentVal.quantity, 0);


  //getting username and token -->
  const username = window.localStorage.getItem('user')
  const token = window.localStorage.getItem('token');


  //function to redirect to payment gateway -->
  const handleClick = () => {
    fetch(`${API}/create-checkout-session`, {
      method: 'POST',
      body: JSON.stringify({username: username}),
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      }
    })
    .then(result => result.json())
    .then(data => {
      console.log(data)
      if(data.stripeUrl) {
        setRedirected(true);
        window.location.href = data.stripeUrl
      }
    })
    .catch(error=> console.log(error))
  }


  //function to close snackbar -->
  const handleClose = () => {
   setRedirected(false);
  }

  return (

    <>
 <div>
    <div className="cart-billing-address">
      <div className="address-subtotal">
        <h3>Subtotal :</h3>
        <h3 id="address-subtotal-price">₹{total}</h3>
      </div>

      <div className='address-shipping-cost'>
        <h4>Shipping : Free Shipping</h4>
        <h4>Shipping to Maharashtra</h4>
      </div>


      <div className="address-total">
        <h3>Total :</h3>
        <h3>₹{total}</h3>
      </div>
      {/* <button class="btn btn-dark"><a href="cart-address.html">Proceed to Checkout</a></button> */}
      <div className='cart-address-proceed-button'>
        {/* <Button onClick={() => {handleOpen(); console.log(open)}} variant="outlined" color='inherit'>Proceed to Checkout</Button> */}
        <Button onClick={() => {handleClick()}} variant="outlined" color='inherit'>Proceed to Checkout</Button>
      </div>

    </div>
    <TransitionsModal open={open} handleClose={handleClose}/>
    </div>

    <Snackbar open={redirected} autoHideDuration={6000} onClose={handleClose} >
      <Alert onClose={handleClose} severity="success" variant="filled" >
        You are being redirected to payment gateway.
      </Alert>
    </Snackbar>
    </>
   

  );
}


//modal for successful order
function TransitionsModal({open, handleClose}) {

  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    backgroundColor: '#f9f9f9',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: '1rem'
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box style={style}>
          <div className='order-placed-modal'>
          <img src={fireworks} alt='fire works' />
          <h1>Order has been placed successfully!</h1>
          <Button onClick={() => navigate('/home')} variant='outlined' color='inherit'>Continue Shopping</Button>
          </div>
          </Box>
        </Fade>
        
      </Modal>
    </div>
  );
}