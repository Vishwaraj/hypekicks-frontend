import { Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export function ProfileSideBar() {
  const navigate = useNavigate();

  //style for sidebar buttons
  const sideBarButton = {
    fontSize: "1.17rem",
  };

  //state for snackbar -->
  const [loggedOut, setLoggedOut] = useState(false);

  
  //function to handle logout -->
  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    setLoggedOut(true);
    setTimeout(() => {navigate('/')}, 2000)
  }

  
  //function to handle close -->
  const handleClose = () => {
    setLoggedOut(false);
  }

  return (

    <>
    <div class="profile-sidebar">
      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page")}
        variant="text"
        color="inherit"
      >
        Dashboard
      </Button>

      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page/orders")}
        variant="text"
        color="inherit"
      >
        Orders
      </Button>

      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page/addresses")}
        variant="text"
        color="inherit"
      >
        Addresses
      </Button>

      <Button
        style={sideBarButton}
        onClick={() => navigate("/profile-page/account-details")}
        variant="text"
        color="inherit"
      >
        Account Details
      </Button>

  
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
