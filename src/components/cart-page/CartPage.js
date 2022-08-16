import { CartProductList } from "./CartProductList";
import { CartBilling } from "./CartBilling";
import { useEffect, useState, useContext } from "react";
import { globalContext } from "../../App";

export function CartPage() {

  //getting the global context
  const { cart, setCart, fetchCart } = useContext(globalContext);

  useEffect(() => {
    fetchCart();
  }, []);


  //calcualting sum used for total
  let sum;
  cart.forEach((product) => {
    sum += product.price * product.quantity;
  });

  //setting state for total
  const [total, setTotal] = useState(sum);

  return (
    <div>
      <h1 className="cart-title">Cart</h1>
      <div className="cart-body">
        {cart.length === 0 ? (
          <h1 style={{ marginRight: "36rem", marginBottom: '15rem' }}>Cart is empty</h1>
        ) : (
          <>
            <CartProductList fetchCart={fetchCart} setTotal={setTotal} />
            <CartBilling total={total} setTotal={setTotal} />
          </>

        )}

      </div>
    </div>
  );
}
