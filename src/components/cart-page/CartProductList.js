import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useContext, useEffect, useState } from 'react';
import {API} from '../../global'
import { globalContext } from '../../App';


export function CartProductList({ fetchCart, setTotal}) {

  const {cart} = useContext(globalContext);

  return (
    <div className="cart-product-list">
     {cart.map((sneaker) => {
      return <CartProductSingle setTotal={setTotal} fetchCart={fetchCart} key={sneaker._id} sneaker={sneaker} cart={cart} />
     })}

    </div>
  );
}


function CartProductSingle({sneaker, fetchCart, cart, setTotal}) {

  const cartShoeInput = {
    width: '5vw',
  };

  const min = 1;
  const max = 10;

  const token = window.localStorage.getItem('token');

  const removeProduct = async () => {
    const id = await sneaker._id;
    fetch(`${API}/cart`, {
      method: "DELETE",
      body: JSON.stringify({id: id}),
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      }
    })
    .then(result => result.json())
    .then(data => {console.log(data)})
    .then(()=>fetchCart())
    .catch(error=> console.log(error))
    
   
  }


  // COUNT CODE
  const [totalPrice, setTotalPrice] = useState(sneaker.price);

  
  const updateQuantity = async (quantity, id) => {

      try {
        const result = await fetch(`${API}/cart`, {
          method: 'PUT',
          body: JSON.stringify({quantity: quantity, id: id}),
          headers: {
            "Content-type": "application/json",
            "auth-token": token
          }
        })

        const data = await result.json();

        console.log(data);

      } catch (error) {
        console.log(error);
      }

  }

  const handleCountChange = (e) => {
    sneaker.quantity = +e.target.value;
    
    updateQuantity(sneaker.quantity, sneaker._id);
    
    setTotalPrice(sneaker.quantity * sneaker.price);
    let newTotal = cart.reduce((acc, curr)=> acc+= curr.price*curr.quantity, 0);
    setTotal(newTotal);
  }


  


  return (
    <div className="cart-product">
      <IconButton onClick={()=>removeProduct()}>
        <CloseIcon  />
      </IconButton>
      <img src={sneaker.image} alt={sneaker.name} />
      <h2>{sneaker.name}</h2>
      {/* <input type="number" min-value="1" value="1"/> */}
      <TextField defaultValue={sneaker.quantity} onChange={(e)=>handleCountChange(e)} inputProps={{ min, max }} style={cartShoeInput} type='number' />
      <h3>₹{totalPrice}</h3>
    </div>
  );
}