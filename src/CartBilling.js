import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export function CartBilling() {

  const navigate = useNavigate();

  return (
    <div class="cart-billing">
      <div class="subtotal">
        <h3>Subtotal :</h3>
        <h3 id="subtotal-price">₹15,995</h3>
      </div>

      <div className='shipping-cost'>
        <h4>Shipping : Free Shipping</h4>
        <h4>Shipping to Maharashtra</h4>
      </div>


      <div class="total">
        <h3>Total:</h3>
        <h3>₹15,995</h3>
      </div>
      {/* <button class="btn btn-dark"><a href="cart-address.html">Proceed to Checkout</a></button> */}
      <div className='cart-proceed-button'>
        <Button onClick={() => navigate('/cart/billing-details')} variant="outlined" color='inherit'>Proceed to Checkout</Button>
      </div>

    </div>
  );
}
