import { Alert, Button, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import './admin-login-page.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API } from '../../../global';
import {useNavigate} from 'react-router-dom';
import AdminHeader from '../admin-header/AdminHeader';



//admin login schema -->
const adminLoginSchema = yup.object({
    adminName: yup.string().required('This is a required field').min(5, 'Minimum 5 characters required'),
    password: yup.string().required('This is a required field').min(8, 'Minimum 8 characters required')
})


export default function AdminLoginPage() {


  //formik initialization
    const {handleChange, handleSubmit, handleBlur, values, errors, touched} = useFormik({
        initialValues: {
            adminName: '',
            password: ''
        },
        validationSchema: adminLoginSchema,
        onSubmit: (admin) => {
            console.log('this is admin login', admin);
            loginAdmin(admin);
        }
    })

    
    const navigate = useNavigate()
    
    //state for snackbar
    const [open, setOpen] = useState(false);


    //function to login admin -->
    const loginAdmin = (admin) => {
      try {
        fetch(`${API}/admin/login`, {
            method: 'POST',
            body: JSON.stringify(admin),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(result => result.json())
        .then(data => {console.log(data);
        window.localStorage.setItem('adminToken', data.adminToken);
        window.localStorage.setItem('adminName', data.adminName);
        })
        .then(()=>{
        const adminToken = window.localStorage.getItem('adminToken');

        if(adminToken) {
          setOpen(true);
          setTimeout(() => {
          navigate('/admin/dashboard')
          }, 2000);
        }})

        
      } catch (error) {
        console.log(error)
      }
    }


    //function to close snackbar
    const handleClose = () => {
        setOpen(false);
    }


  return (
    <>
    <AdminHeader/>
        <div className='admin-login-page'>
        
        <div className='admin-login-form' >
        <h3>Log in to Admin Account</h3>
        <form onSubmit={handleSubmit} className='admin-login-form'>
            
            <TextField
            onChange={handleChange} onBlur={handleBlur} name='adminName' value={values.adminName} error={touched.adminName && errors.adminName ? errors.adminName : null} helperText={touched.adminName && errors.adminName ? errors.adminName : null}
             label='Admin Name' />
            
            <TextField
             onChange={handleChange} onBlur={handleBlur} name='password' value={values.password} error={touched.password && errors.password ? errors.password : null} helperText={touched.password && errors.password ? errors.password : null}
             label='Password' />
            
            <Button type='submit' variant='outlined' color='inherit'>Log In</Button>
        
        </form>
        </div>
      
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Admin Login Successfull
          You will be redirected to the admin dashboard
        </Alert>
      </Snackbar>
    </>
  )
}
