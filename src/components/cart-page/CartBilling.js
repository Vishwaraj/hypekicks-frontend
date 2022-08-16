import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { globalContext } from '../../App';


export function CartBilling({total, setTotal}) {

  const navigate = useNavigate();

  //getting cart from global context
  const {cart} = useContext(globalContext)

  //calculating total price in cart
  let sum = cart.reduce((total, currentVal)=> total += currentVal.price*currentVal.quantity, 0);
  setTotal(sum)

  return (
    <div class="cart-billing">
      <div class="subtotal">
        <h3>Subtotal :</h3>
        <h3 id="subtotal-price">₹{total}</h3>
      </div>

      <div className='shipping-cost'>
        <h4>Shipping : Free Shipping</h4>
        <h4>Shipping to Maharashtra</h4>
      </div>


      <div class="total">
        <h3>Total:</h3>
        <h3>₹{total}</h3>
      </div>
      {/* <button class="btn btn-dark"><a href="cart-address.html">Proceed to Checkout</a></button> */}
      <div className='cart-proceed-button'>
        <Button onClick={() => navigate('/cart/billing-details')} variant="outlined" color='inherit'>Proceed to Checkout</Button>
      </div>

    </div>
  );
}
