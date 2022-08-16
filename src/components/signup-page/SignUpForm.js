import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {API} from '../../global';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const userValidationSchema = yup.object({
  firstName: yup.string().required('This is a required field'),
  lastName: yup.string().required('This is a required field'),
  email: yup.string().required('This is a required field'),
  password: yup.string().required().min(8, 'This is a required field')
})

export function SignUpForm() {

  //setting state for snackbar
  const [signedIn, setSignedIn] = useState(false);

  const navigate = useNavigate();


  //style for signup button
  const signUpButton = {
    height: '8vh',
    marginTop: '1rem'
  };


  //formik initialization
  const {handleSubmit, handleChange, handleBlur, values, errors, touched} = useFormik({
    initialValues: {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: userValidationSchema,
    onSubmit: (user) => {
      console.log('this is a sign up user', user);
      signUpUser(user)
    }
  })


  //function to signup user -->
  const signUpUser = (user) => {
    fetch(`${API}/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(result => result.json())
    .then(data => {console.log('this is the signed in user', data)
     setSignedIn(true);  //setting state to snackbar
  })
    .then(()=>{
      setTimeout(() => {navigate('/login')}, 2000)
    })
    .catch(error => console.log(error)) 
  } 


  //function to close snackbar
  const handleClose = () => {
    setSignedIn(false);
  }
 
  return (
    <>
    <div className='sign-up-form-body'>
      <form onSubmit={handleSubmit} className='sign-up-form'>
        
      <TextField onChange={handleChange} onBlur={handleBlur} value={values.username} 
        name='userName'
        id="outlined-basic" label="Username" variant="outlined" />

        <TextField onChange={handleChange} onBlur={handleBlur} value={values.firstName} 
        name='firstName'
        id="outlined-basic" label="First Name" variant="outlined" />
        
        <TextField onChange={handleChange} onBlur={handleBlur} value={values.lastName}
        name='lastName'
         id="outlined-basic" label="Last Name" variant="outlined" />
        
        <TextField onChange={handleChange} onBlur={handleBlur} value={values.email} name='email' id="outlined-basic" label="E-mail" variant="outlined" />
        
        <TextField onChange={handleChange} onBlur={handleBlur} value={values.password} name='password' id="outlined-basic" label="Password" variant="outlined" />
        
        <Button type='submit' style={signUpButton} variant="contained" color='success'>Create Account</Button>
      </form>
    </div>

    <Snackbar open={signedIn} autoHideDuration={6000} onClose={handleClose} >
      <Alert onClose={handleClose} severity='success' variant='filled' >
        Account Created Successfully!
      </Alert>
    </Snackbar>
    </>

  );
}


