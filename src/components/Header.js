import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { globalContext } from '../App';
import { useContext } from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';


// --------------------header component------------------------
export function Header() {

  //getting the global context
const {cart} = useContext(globalContext);

//getting the token
const token = window.localStorage.getItem('token');

//custom styles for appbar component
  const appBarStyles = {
    backgroundColor: '#212529',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  };

  const navigate = useNavigate();

  return (
    <AppBar style={appBarStyles}>
      <h1 onClick={()=>{navigate('/')}} className='title'>HYPE KICKS</h1>

      <Toolbar>
        <div className='header-buttons'>


        {token ? <>

          <IconButton color='inherit' onClick={() => navigate('/home')}>
          <HomeIcon fontSize="large" />
        </IconButton>
                
        <IconButton color='inherit' onClick={() => navigate('/cart')} aria-label="Example">
        <Badge badgeContent={cart.length} color="primary">
        <ShoppingCartIcon fontSize="large" />
        </Badge>
        </IconButton>
        
        
        <IconButton color='inherit' onClick={() => navigate('/profile-page')}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>

        </>  
        
        : <><Button variant="text" color='inherit' onClick={() => navigate('/login')}>Log in</Button>
        <Button variant="text" color='inherit' onClick={() => navigate('/signup')}>Sign up</Button></> 
        }
      
        
       
        </div>
      </Toolbar>
    </AppBar>
  );
}


