import { useEffect, useState } from "react";
import {API} from '../../global';
import "../../App.css";

export function OrderList() {

  //setting state for orders and products array
  const [orders, setOrders] = useState([]);
  const [productsArr, setProductsArr] = useState([]);

  //getting user and token
  const user = window.localStorage.getItem('user');
  const token = window.localStorage.getItem('token');


  //function to get orders placed -->
  const getOrders = () => {
    fetch(`${API}/profile-page/orders`, {
      method: 'POST',
      body: JSON.stringify({user: user}),
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      }
    })
    .then(result=> result.json())
    .then(data => {setOrders(data.result); setProductsArr(data.products)})
    .catch(error=> console.log(error))
  }

  useEffect(()=> {
    getOrders()
  }, [])



  return (
    <div className='order-list'>
    {productsArr.map((sneaker) => {
      return <OrderBody user={user} sneaker={sneaker} />
    })}
    </div>
  );
}

function OrderBody({user, sneaker}) {
  return (
    <div className='order-body'>
       <ProductOrder sneaker={sneaker} />
       <ProfileOrderShipping user={user} />
    </div>
  );
}

function ProductOrder({sneaker}) {
  return (
    <div className="product-order">
      <img src={sneaker.image} alt="" />
      <div className="product-order-info">
        <h3>{sneaker.name}</h3>
        <h4>Size: {sneaker.size}</h4>
        <h4>Quantity: {sneaker.quantity}</h4>
        <h4>₹{sneaker.price}</h4>
      </div>
    </div>
  );
}
function ProfileOrderShipping({user}) {



  return (
    <div className="shipping-info">
      <h3>Shipping to :</h3>
      <h3>{user}</h3>
      <h3>Address : Default Address</h3>
      <h3>Arriving in : {Math.floor(Math.random() * 10) + 1} days</h3>
    </div>
  );
}
