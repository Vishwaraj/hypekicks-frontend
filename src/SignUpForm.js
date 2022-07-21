import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


export function SignUpForm() {

  const navigate = useNavigate();

  const signUpButton = {
    height: '8vh',
    marginTop: '1rem'
  };

  return (
    <div className='sign-up-form-body'>
      <form className='sign-up-form'>
        <TextField id="outlined-basic" label="First Name" variant="outlined" />
        <TextField id="outlined-basic" label="Last Name" variant="outlined" />
        <TextField id="outlined-basic" label="E-mail" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <Button style={signUpButton} variant="contained" color='success' onClick={() => navigate('/home')}>Create Account</Button>
      </form>
    </div>
  );
}
