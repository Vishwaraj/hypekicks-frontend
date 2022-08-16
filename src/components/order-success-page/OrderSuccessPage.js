import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useLayoutEffect, useRef } from "react";
import fireworks from "../../images/fireworks.png";
import { globalContext } from "../../App";

export function OrderSuccessPage() {
  const navigate = useNavigate();

  //getting function and set cart from global context 
  const { addOrders, setCart } = useContext(globalContext);

  //setting ref
  const orderSuccessRef = useRef();

  //effect to add sneakers to the orders collections -->
  useLayoutEffect(() => {
    if (!orderSuccessRef.current) {
      addOrders();
      setCart([]);
      console.log("Hello there");
      orderSuccessRef.current = true;
    }

  });

  
  return (
    <>
      <div className="order-placed-modal">
        <img src={fireworks} alt="fire works" />
        <h1>Order has been placed successfully!</h1>
        <Button
          onClick={() => navigate("/home")}
          variant="outlined"
          color="inherit"
        >
          Continue Shopping
        </Button>
      </div>
    </>
  );
}
