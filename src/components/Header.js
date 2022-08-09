import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { globalContext } from '../App';
import { useContext } from 'react';
import { Badge } from '@mui/material';


// --------------------header component------------------------
export function Header() {

const {cart} = useContext(globalContext);

  const appBarStyles = {
    backgroundColor: '#212529',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  };

  const navigate = useNavigate();

  return (
    <AppBar style={appBarStyles}>
      <h1 className='title'>HYPE KICKS</h1>

      <Toolbar>
        <div className='header-buttons'>
        
        <Button variant="text" color='inherit' onClick={() => navigate('/')}>Home</Button>
        <Button variant="text" color='inherit' onClick={() => navigate('/login')}>Log in</Button>
        <Button variant="text" color='inherit' onClick={() => navigate('/signup')}>Sign up</Button>
        
        <Badge badgeContent={cart.length} color="primary">
        <Button variant="text" color='inherit' onClick={() => navigate('/cart')}>Cart</Button>
        </Badge>
       
        <Button variant="text" color='inherit' onClick={() => navigate('/profile-page')}>Profile</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}


