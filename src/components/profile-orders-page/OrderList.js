import { useEffect, useState } from "react";
import {API} from '../../global';
import "../../App.css";
import { Card, CardContent, CardMedia } from "@mui/material";

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

console.log(orders)

  return (
    <div className='order-list'>
    {orders.map((order) => {
      return <OrderBody user={user} order={order} />
    })}
    </div>
  );
}

function OrderBody({user, order}) {
  return (
    <div className='order-body'>
       {/* <ProductOrder sneaker={sneaker} />
       <ProfileOrderShipping user={user} /> */}
       <NewProductOrder user={user} order={order} />
    </div>
  );
}

function NewProductOrder({user, order}) {

  let total;
  if(order.sneakers.length > 1) {
    total = order.sneakers.reduce((acc, curr) => (acc.price*acc.quantity) + (curr.price*curr.quantity));
  } else {
    total = order.sneakers[0].price
  }


  console.log(total);

  return (
    <>
      <div className="new-product-order" >
      <div className="new-order-details" >
      <h3>Shipping to: {user}</h3>
      <h3>Placed on : {order.date}</h3>
      <h3>Total amount : Rs {total}</h3>
      </div>

      <div className='new-product-list' >
      {order.sneakers.map((sneaker) => {
        return <NewProductCard sneaker={sneaker} />
      })}
      </div>

      </div>
    </>
  )
}

function NewProductCard({sneaker}) {

  const cardStyle ={
    width: '17vw'
  }

  let binaryImage = null;
  if(sneaker.image) {
    if(sneaker.image.length > 10000) {
      binaryImage = `data:image/jpeg;base64,${sneaker.image}`
    }
  }

  return (
    <>
      <div className="new-sneaker-card" >
      <Card style={cardStyle} >
      <CardMedia
        component="img"
        height="140"
        image={binaryImage !== null ? binaryImage : sneaker.image}
        alt={sneaker.name}
       />
       <CardContent>
        <h4 className="product-card-margin-fix" >{sneaker.name}</h4>
        <h4 className="product-card-margin-fix" >Size : {sneaker.size}</h4>
        <h4 className="product-card-margin-fix" >Quantity : {sneaker.quantity}</h4>
        <h4 className="product-card-margin-fix" >Price : Rs {sneaker.price}</h4>
       </CardContent>
      </Card>
      </div>
    </>
  )
}



function ProductOrder({sneaker}) {

  let binaryImage = null;
  if(sneaker.image) {
    if(sneaker.image.length > 10000) {
      binaryImage = `data:image/jpeg;base64,${sneaker.image}`
    }
  }


  return (
    <div className="product-order">
      <img src={ binaryImage !== null ? binaryImage : sneaker.image} alt="" />
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
      <h4>Shipping to :</h4>
      <h4>{user}</h4>
      <h4>Address : Default Address</h4>
      <h4>Arriving in : {Math.floor(Math.random() * 10) + 1} days</h4>
    </div>
  );
}
