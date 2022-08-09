import { CartAddressBilling } from "./CartAddressBilling";
import { BillingAddress } from "./BillingAddress";
import { useEffect, useState, useContext } from "react";
import { API } from "../../global";
import { CartAddressProductList } from "./CartAddressProduct";
import { globalContext } from "../../App";

export function BillingDetailsPage() {
  const { cart } = useContext(globalContext);

  const username = window.localStorage.getItem("user");
  const token = window.localStorage.getItem('token');

  const [form, setForm] = useState(null);

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
        {form ? <BillingAddress form={form} /> : <h1>Loading...</h1>}

        <div className="cart-address-billing">
          <CartAddressProductList />

          <CartAddressBilling />
        </div>
      </div>
    </div>
  );
}
