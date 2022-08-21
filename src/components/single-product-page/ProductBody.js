import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {API} from '../../global'


export function ProductBody({singleProduct}) {

let binaryImage = null;
if(singleProduct.image) {
  if(singleProduct.image.length > 10000) {
    binaryImage = `data:image/jpeg;base64,${singleProduct.image}`
  }
}


  //setting state for size
  const [size, setSize] = useState(0);

  //styles for shoe size select component
  const shoeSizeSelect = {
    width: '8vw',
    marginLeft: '1rem',
    height: '5vh',
    marginBottom: '2rem',
  };


  //function to add sneaker to cart
  const addToCart = async () => {


      //getting user and token
     const user = window.localStorage.getItem('user');
     const token = window.localStorage.getItem('token');
     
     //creating the product to be sent
     const productSent = {...singleProduct, size: size, quantity: 1, user: user}


     //fetch call
     fetch(`${API}/home/single-product/${singleProduct._id}`, {
      method: "POST",
      body: JSON.stringify(productSent),
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      }
     } )
     .then((result) => {
      result.json()
    })
     .then(data => {
      console.log(data)
    })
    .then(()=>navigate('/cart'))
     .catch(error => {
      console.log(error)
    })
  }
  

  const navigate = useNavigate();

  //function to handle change in sneaker size
  const handleSizeChange = (e) => {
   
   setSize(e.target.value);
  
  }
  

  return (
    <div className="product-body">
      <img className="single-product-image" src={binaryImage !== null ? binaryImage : singleProduct.image} alt="" />

      <div className="single-information">
        <h2>{singleProduct.name}</h2>
        <h3>₹{singleProduct.price}</h3>
        <p>{singleProduct.description}</p>
        <div className="shoe-size">

          <InputLabel>Shoe Size (UK)</InputLabel>
          <Select
            labelId="test-select-label"
            label="Shoe Size"
            style={shoeSizeSelect}
            onChange={(e)=> handleSizeChange(e)}
            value={size}
            required={true}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={7}>7</MenuItem>
          </Select>
        </div>
        <Button disabled={size ? false : true} variant="outlined" color='inherit' onClick={() => {
        addToCart()
        }
        }>Add to Cart</Button>
      </div>
    </div>
  );
}
