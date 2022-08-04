import { useContext } from "react";
import { globalContext } from "./App";


export function ProfileDashboard() {

  const {user} = useContext(globalContext)

  console.log(user);
  return (
    <div>
      <h3>Hello {user.username}</h3>
      <h4>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</h4>
    </div>
  );
}
