import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { grey } from '@mui/material/colors';
import { useFormik } from "formik";
import * as yup from 'yup';
import {API} from './global';
import { useContext } from 'react';
import { globalContext } from './App';


const userValidationSchema = yup.object({
  username: yup.string().required('This field is required'),
  password: yup.string().required().min(8, 'Password needs to be 8 or more characters')
})

export function LoginForm() {

  const greyButton = grey[900];
  const navigate = useNavigate();

  const loginButton = {
    width: '100%',
    marginTop: '0.5rem'
  }

  const {handleSubmit, handleChange, handleBlur, values, errors, touched} = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: userValidationSchema,
    onSubmit: (user) => {
    console.log('this is the user', user)
    loginUser(user)
    }
  })

  const{ user ,setUser} = useContext(globalContext)

  const loginUser = (user) => {
    
    fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(result => result.json())
    .then(data => {console.log('this is the login user', data); setUser(data.user)
     window.localStorage.setItem('token', data.token);
     window.localStorage.setItem('user', data.user.username)
     }) //saving the user to state
    .then(navigate('/home'))
  }




  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <div className='form-input'>
          
          <TextField onChange={handleChange} onBlur={handleBlur} value={values.username} name='username' id="outlined-basic" label="Username" variant="outlined" />
          
          <TextField onChange={handleChange} onBlur={handleBlur} value={values.password} name='password' id="outlined-basic" label="Password" variant="outlined" />
        </div>
        
        
        <div className='login-button'>
          <Button type='submit' style={loginButton} variant="outlined" color='inherit' >Log In</Button>
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


//onClick={() => navigate('/home')}