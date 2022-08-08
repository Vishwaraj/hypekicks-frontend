import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {API} from './global';
import { useEffect, useState } from "react";



const accountFormValidation = yup.object({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  email: yup.string().email("Must be a valid e-mail").required("This field is required")
})

export function ProfileAccountForm({initialForm}) {
  const accDetailsName = {
    width: "30vw",
  };

  const accDetailsButton = {
    width: "100%",
    marginTop: "2rem",
  };

  const user = window.localStorage.getItem('user');


  const {handleChange, handleBlur, handleSubmit, values, errors, touched} = useFormik({
    initialValues: {
      firstName: initialForm.firstName,
      lastName: initialForm.lastName,
      email: initialForm.email
    },
    validationSchema: accountFormValidation,
    onSubmit: (update) => {
      console.log('this is the update', update);
      sendUpdate(update);
    }
  })



  const sendUpdate = (update) => {
   
     fetch(`${API}/profile-page/account-details`, {
      method: 'PUT',
      body: JSON.stringify({update: update, user: user}),
      headers: {
        "Content-type": "application/json"
      }
     })
     .then(result => result.json())
     .then(data => console.log(data))
     .catch(error => console.log(error))

  }


  return (
  
    <>
      {initialForm !== null ? 
      <form onSubmit={handleSubmit} class="account-details-form" action="">
      <div className="name">
        <TextField
          style={accDetailsName}
          id="outlined-basic"
          label="First Name"
          variant="outlined" 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          name='firstName'
          error={touched.firstName && errors.firstName ? errors.firstName : null} 
          helperText={touched.firstName && errors.firstName ? errors.firstName : null}
          />
        <TextField
          style={accDetailsName}
          id="outlined-basic"
          label="Last Name"
          variant="outlined" 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          name='lastName'
          error={touched.lastName && errors.lastName ? errors.lastName : null}
          helperText={touched.lastName && errors.lastName ? errors.lastName : null}  
          />
      </div>

      <div className="username-email">

        <TextField id="outlined-basic" label="E-mail" variant="outlined" 
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name='email'
          error={touched.email && errors.email ? errors.email : null}
          helperText={touched.email && errors.email ? errors.email : null}
        />
      </div>


      <Button type='submit' style={accDetailsButton} variant="outlined" color="inherit">
        Save Changes
      </Button>
    </form>
    : <h3>Loading...</h3>
    }
    </>

   
   
  );
}
