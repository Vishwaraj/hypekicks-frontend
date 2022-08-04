import { useContext } from 'react';
import {globalContext} from './App'


export function CartAddressProductList() {

  const {cart} = useContext(globalContext);

 
  return (
    <>
    {cart.map((sneaker) => {
      return <CartAddressProduct sneaker={sneaker}/>
    })}
    </>
  )

}


export function CartAddressProduct({sneaker}) {
  return (
    <div className="cart-address-product">
      <img src={sneaker.image} alt="" />
      <h3>{sneaker.name}</h3>
      <h4>Quantity : {sneaker.quantity}</h4>
      <h4>₹{sneaker.price * sneaker.quantity}</h4>
    </div>
  );
}