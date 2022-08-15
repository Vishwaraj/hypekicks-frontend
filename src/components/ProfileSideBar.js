import { Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";





export function ProfileSideBar() {
  const navigate = useNavigate();

  const sideBarButton = {
    fontSize: "1.3rem",
  };

  //state for snackbar -->
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    setLoggedOut(true);
    setTimeout(() => {navigate('/')}, 2000)
  }


  const handleClose = () => {
    setLoggedOut(false);
  }

  return (

    <>
    <div class="profile-sidebar">
      {/* <h4><a href="profile.html">Dashboard</a></h4> */}
      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page")}
        variant="text"
        color="inherit"
      >
        Dashboard
      </Button>

      {/* <h4><a href="profile-orders.html">Orders</a></h4> */}
      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page/orders")}
        variant="text"
        color="inherit"
      >
        Orders
      </Button>

      {/* <h4><a href="profile-addresses.html">Addresses</a></h4> */}
      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page/addresses")}
        variant="text"
        color="inherit"
      >
        Addresses
      </Button>

      {/* <h4><a href="profile-account-details.html">Account Details</a></h4> */}
      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page/account-details")}
        variant="text"
        color="inherit"
      >
        Account Details
      </Button>

      {/* <h4>Log out</h4> */}
      <Button style={sideBarButton} onClick={()=> {handleLogout()}} variant="text" color="inherit">
        Log out
      </Button>
    </div>

    <Snackbar open={loggedOut} autoHideDuration={6000} onClose={handleClose} >
      <Alert onClose={handleClose} severity="success" variant="filled" >
        Log Out Successful, you will be redirected to landing page.
      </Alert>
    </Snackbar>
    </>

  );
}
