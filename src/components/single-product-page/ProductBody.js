import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {API} from '../../global'


export function ProductBody({singleProduct}) {

  const [size, setSize] = useState(0);


  const shoeSizeSelect = {
    width: '8vw',
    marginLeft: '1rem',
    height: '5vh',
    marginBottom: '2rem',
  };

  const addToCart = async () => {

     const user = window.localStorage.getItem('user');
     const token = window.localStorage.getItem('token');
     
     const productSent = {...singleProduct, size: size, quantity: 1, user: user}

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

  const handleSizeChange = (e) => {
   
   setSize(e.target.value);
  
  }
  

  return (
    <div className="product-body">
      <img className="single-product-image" src={singleProduct.image} alt="" />

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
