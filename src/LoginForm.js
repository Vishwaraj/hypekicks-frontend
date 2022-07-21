import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { grey } from '@mui/material/colors';



export function LoginForm() {

  const greyButton = grey[900];
  const navigate = useNavigate();

  const loginButton = {
    width: '100%',
    marginTop: '0.5rem'
  }

  return (
    <div className='login-form'>
      <form>
        <div className='form-input'>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </div>
        <div className='login-button'>
          <Button style={loginButton} variant="outlined" color='inherit' onClick={() => navigate('/home')}>Log In</Button>
        </div>
      </form>
      <h3>Don't have an account?</h3>
      <div className='login-option-buttons'>
        <Button variant="outlined" color='inherit'>Log in with Google</Button>
        <Button variant="outlined" color='inherit'>Log in with FaceBook</Button>
        <Button variant="outlined" color='inherit' onClick={() => navigate('/signup')}>Create Account</Button>
      </div>
    </div>
  );
}
