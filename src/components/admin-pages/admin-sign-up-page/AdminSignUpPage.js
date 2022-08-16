import './admin-sign-up-page.css';
import React, { useState } from 'react'
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {API} from '../../../global';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../admin-header/AdminHeader';


//admin validation schema
const adminValidationSchema = yup.object({
    adminName: yup.string().required().min(5, 'Minimum 5 Characters Required'),
    firstName: yup.string().required('This is a required field'),
    lastName: yup.string().required('This is a required field'),
    phone: yup.number().required('This is a required field.').test('len', 'Must be exactly 10 Digits', val => val.toString().length === 10),
    password: yup.string().required().min(8, 'Minimum 8 Characters Required')
})


export default function AdminSignUpPage() {

    //style for textfields
    const nameTextFields = {
        width: "24vw"
    }

    //formik initialisation
    const {handleSubmit, handleChange, handleBlur, values, errors, touched} = useFormik({
        initialValues: {
            adminName: '',
            firstName: '',
            lastName: '',
            phone: 0,
            password: ''
        },
        validationSchema: adminValidationSchema,
        onSubmit: (admin) => {
            console.log('this is the created admin', admin);
            registerAdmin(admin);
        }
    })


    //state for snackbar
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();


    //function to register the admin
    const registerAdmin = (admin) => {
     try {
        fetch(`${API}/admin/sign-up`, {
            method: 'POST',
            body: JSON.stringify(admin),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(result => result.json())
        .then(data => {console.log(data); setOpen(true) 
        setTimeout(() => {navigate('/admin-portal')}, 2000)
        })
     } catch (error) {
        console.log(error)
     }
    }


    //function to close snackbar
    const handleClose = () => {
        setOpen(false);
    }


    //min and max for phone textfield
    const max = 9999999999;
    const min = 1000000000;

  return (
    <>
    <AdminHeader />
    <div className='admin-sign-up-page'>
    <h3>Create Admin Account</h3>
    <div className='admin-sign-up-form'>
    <form onSubmit={handleSubmit} className='admin-sign-up-form'>
        
        <TextField 
        onChange={handleChange} onBlur={handleBlur} value={values.adminName} name='adminName' error={touched.adminName && errors.adminName ? errors.adminName : null} helperText={touched.adminName && errors.adminName ? errors.adminName : null}
        label='AdminName' type='string' />
       
        <div className='first-last-name'>
        
        <TextField 
        onChange={handleChange} onBlur={handleBlur} value={values.firstName} name='firstName' error={touched.firstName && errors.firstName ? errors.firstName : null} helperText={touched.firstName && errors.firstName ? errors.firstName : null}
        style={nameTextFields} label='First Name' type='string' />
        
        <TextField 
        onChange={handleChange} onBlur={handleBlur} value={values.lastName} name='lastName' error={touched.lastName && errors.lastName ? errors.lastName : null} helperText={touched.lastName && errors.lastName ? errors.lastName : null}
        style={nameTextFields} label='Last Name' type='string' />
        
        </div>
       
        <TextField 
        onChange={handleChange} onBlur={handleBlur} value={values.phone} name='phone' error={touched.phone && errors.phone ? errors.phone : null} helperText={touched.phone && errors.phone ? errors.phone : null}
        label='Phone Number' type='number' inputProps={{min, max}}/>
        
        <TextField 
        onChange={handleChange} onBlur={handleBlur} value={values.password} name='password' error={touched.password && errors.password ? errors.password : null} helperText={touched.password && errors.password ? errors.password : null}
        label='Password' type='string' />
    
        <Button type='submit' variant='outlined' color='success' >Create Admin Account</Button>
    </form>
    </div>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Admin Account Successfully Created!
          You are being redirected to login page.
        </Alert>
      </Snackbar>
    </div>
    </>

  )
}
