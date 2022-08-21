import { useContext } from "react";
import { globalContext } from "../../App";


export function ProfileDashboard() {

  //getting user
  const user = window.localStorage.getItem('user');

  return (
    <div>
      <h3>Hello, {user}</h3>
      <h4 style={{fontSize:'0.9rem', width: "70vw"}} >From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</h4>
    </div>
  );
}
