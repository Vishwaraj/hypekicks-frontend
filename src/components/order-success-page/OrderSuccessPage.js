import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useLayoutEffect, useRef } from "react";
import fireworks from "../../images/fireworks.png";
import { globalContext } from "../../App";

export function OrderSuccessPage() {
  const navigate = useNavigate();

  const { addOrders, setCart } = useContext(globalContext);

  const orderSuccessRef = useRef();


  useLayoutEffect(() => {
    if (!orderSuccessRef.current) {
      addOrders();
      setCart([]);
      console.log("Hello there");
      orderSuccessRef.current = true;
    }

  });





  console.log(orderSuccessRef.current);
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
