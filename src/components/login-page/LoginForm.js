import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { grey } from '@mui/material/colors';
import { useFormik } from "formik";
import * as yup from 'yup';
import {API} from '../../global';
import { useContext, useState } from 'react';
import { globalContext } from '../../App';
import { Alert, Snackbar } from '@mui/material';


//user validation schema -->
const userValidationSchema = yup.object({
  username: yup.string().required('This field is required'),
  password: yup.string().required().min(8, 'Password needs to be 8 or more characters')
})

export function LoginForm() {

  //style for button
  const greyButton = grey[900];
  const navigate = useNavigate();


  //style for loginButton
  const loginButton = {
    width: '100%',
    marginTop: '0.5rem'
  }


  //formik initialisation -->
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


  //getting global user state
  const{ user ,setUser} = useContext(globalContext)


  //states for snackbar
  const [loggedIn, setLoggedIn] = useState(false);
  const [LoginError, setLoginError] = useState(false);


  //function to login user -->
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
    

    //checking for token and user
    if(data.token && data.user) { //saving the user to local storage
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user', data.user.username);
      setLoggedIn(true);
      setTimeout(() => {
        navigate('/home')
        }, 2000)
    }
     
      //code for login error snackbar
      console.log('This message ',data.msg)
      data.msg ? setLoginError(true) : setLoginError(false);

     }) 
    .catch(error => {
      console.log(error)
    })



    
  }


  //handling close for snackbar -->
  const handleClose = () => {
    setLoggedIn(false);
    setLoginError(false);
  }


  return (
    <>
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
        {/* <Button variant="outlined" color='inherit'>Log in with Google</Button>
        <Button variant="outlined" color='inherit'>Log in with FaceBook</Button> */}
        <Button variant="outlined" color='inherit' onClick={() => navigate('/signup')}>Create Account</Button>
      </div>
      <h3 style={{marginTop: "1rem"}}>Are you an Admin?</h3>
      <div className='admin-account-button' >
      <Button style={loginButton} onClick={()=>navigate('/admin-portal')} variant="outlined" color='inherit' >Admin Portal</Button>
      </div>
    </div>
    <Snackbar open={loggedIn} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='success' variant='filled'>
        Log In Successful, you will be redirected to the home page.
      </Alert>
    </Snackbar>
    <Snackbar open={LoginError} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' variant='filled'>
        Log In Failed, try again.
      </Alert>
    </Snackbar>
    </>
  );
}


//onClick={() => navigate('/home')}