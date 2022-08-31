import { CartAddressBilling } from "./CartAddressBilling";
import { BillingAddress } from "./BillingAddress";
import { useEffect, useState, useContext } from "react";
import { API } from "../../global";
import { CartAddressProductList } from "./CartAddressProduct";
import { globalContext } from "../../App";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function BillingDetailsPage() {

  //getting cart form global context
  const { cart } = useContext(globalContext);

  //getting username and token
  const username = window.localStorage.getItem("user");
  const token = window.localStorage.getItem('token');

  //setting state for form data
  const [form, setForm] = useState(null);

  
  //function to get address data -->
  const getAddressData = () => {
    fetch(`${API}/cart/billing-details`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      },
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setForm(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAddressData();
  }, []);



  return (
    <div>
      <h1 id="cart-address-title">Billing Details</h1>
      <div className="cart-address-body">
        {form ? <BillingAddress form={form} /> : <NoAddressFound /> }

        <div className="cart-address-billing">
          <CartAddressProductList />

          <CartAddressBilling />
        </div>
      </div>
    </div>
  );
}


function NoAddressFound() {

  const navigate = useNavigate();

  const buttonStyles ={
    marginTop: '1.5rem'
  }

  return (
    <>
      <div className="no-address-found" >
      <h1 >No Address found</h1>
      <Button style={buttonStyles} variant='outlined' color='inherit'  onClick={()=>navigate('/profile-page/addresses')}>Add Address</Button>
      </div>
    </>
  )
}