import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';
import { globalContext } from '../../App';
import { API } from '../../global';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { Alert, Button, Snackbar } from '@mui/material';


//validation for address form
const addressValidationSchema = yup.object({
  email: yup.string().required('This is a required field'),
  firstName: yup.string().required('This is a required field'),
  lastName: yup.string().required('This is a required field'),
  streetAddress: yup.string().required('This is a required field'),
  streetAddressContd: yup.string().required('This is a required field'),
  city: yup.string().required('This is a required field'),
  state: yup.string().required('This is a required field'),
  zipcode: yup.number().required().min(5, 'Invalid Pincode, atleast 5 digits required'),
  phone: yup.number().required().min(10, 'Invalid Phone Number, atleast 10 digits required')
})


export function BillingAddress({form}) {

  //setting state for snackbar
  const [updated, setUpdated] = useState(false);

  //styles for textfield components -->
  const selectStyle = {
    width: '10vw',
    marginLeft: '1rem'
  };

  const nameStyle = {
    width: '23vw'
  };

  const saveAddressButton = {
    marginTop: '1rem'
  };


  //formik initialization
  const {handleChange, handleBlur, handleSubmit, values, errors, touched} = useFormik({
    initialValues: {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      streetAddress: form.streetAddress,
      streetAddressContd: form.streetAddressContd,
      city: form.city,
      state: form.state,
      zipcode: form.zipcode,
      phone: form.phone
    },
    validationSchema: addressValidationSchema,
    onSubmit: (address) => {
      console.log('This is the updated address')
      updateAddress(address);
    }
  })

  
  //getting token
  const token = window.localStorage.getItem('token');

  //function to update address -->
  const updateAddress = (address) => {

    const username = window.localStorage.getItem('user');

      fetch(`${API}/cart/billing-details`, {
        method: 'PUT',
        body: JSON.stringify(address),
        headers: {
          "Content-type": "application/json",
          username: username,
          "auth-token": token
        }
      })
      .then(result=> result.json())
      .then(data => {console.log(data)
      setUpdated(true);
      })
      .catch(error=> console.log(error))
  }


  //function to close snackbar -->
  const handleClose = () => {
    setUpdated(false);
  }


  return (

    <>
    <div className="cart-address-form-details">

{form !== null ?       <form onSubmit={handleSubmit} className="cart-address-form" action="">

<TextField onChange={handleChange} onBlur={handleBlur} name='email' defaultValue={values.email}
error={touched.email && errors.email ? errors.email : null}
id="outlined-basic" label="E-mail" variant="outlined" />

<div className="address-form-name cart-address-form-name">

<TextField onChange={handleChange} onBlur={handleBlur} name='firstName' defaultValue={values.firstName}
error={touched.firstName && errors.firstName ? errors.firstName : null}
style={nameStyle} id="outlined-basic" label="First Name" variant="outlined" />

<TextField onChange={handleChange} onBlur={handleBlur} name='lastName' defaultValue={values.lastName}
error={touched.lastName && errors.lastName ? errors.lastName : null}
style={nameStyle} id="outlined-basic" label="Last Name" variant="outlined" />

</div>

<div className='country-area'>
<label className="form-label country" htmlFor="country">Country</label>
<p><strong>India</strong></p>
</div>


<div className="street-address">

<TextField onChange={handleChange} onBlur={handleBlur} name='streetAddress' defaultValue={values.streetAddress}
error={touched.streetAddress && errors.streetAddress ? errors.streetAddress : null}
id="outlined-basic" placeholder="House number and street name" label="Street Address" variant="outlined" />

<TextField onChange={handleChange} onBlur={handleBlur} name='streetAddressContd' defaultValue={values.streetAddressContd}
error={touched.streetAddressContd && errors.streetAddressContd ? errors.streetAddressContd : null}
id="outlined-basic" placeholder="Apartment, suite, unit etc." label="Street Address Continued" variant="outlined" />

</div>

<TextField onChange={handleChange} onBlur={handleBlur} name='city' defaultValue={values.city}
error={touched.city && errors.city ? errors.city : null}
id="outlined-basic" label="Town/City" variant="outlined" />

<div className='state-select'>
<InputLabel id="demo-simple-select-standard-label">State</InputLabel>
<Select
labelId="demo-simple-select-standard-label"
id="demo-simple-select-standard"
label="State"
style={selectStyle}
onChange={handleChange} onBlur={handleBlur} name='state' defaultValue={values.state}
error={touched.state && errors.state ? errors.state : null}
>
<MenuItem value='Maharashtra'>Maharashtra</MenuItem>
<MenuItem value='Tamil Nadu'>Tamil Nadu</MenuItem>
<MenuItem value='Kerala'>Kerala</MenuItem>
</Select>
</div>

<TextField onChange={handleChange} onBlur={handleBlur} name='zipcode' defaultValue={values.zipcode}
error={touched.zipcode && errors.zipcode ? errors.zipcode : null}
type='number' id="outlined-basic" label="Postcode/ZIP" variant="outlined" />

<TextField onChange={handleChange} onBlur={handleBlur} name='phone' defaultValue={values.phone}
error={touched.phone && errors.phone ? errors.phone : null}
type='number' id="outlined-basic" label="Phone Number" variant="outlined" />

<Button type='submit' style={saveAddressButton} variant='outlined' color='inherit'>Update Address</Button>
</form>

: <p>loading</p>}


</div>

<Snackbar open={updated} autoHideDuration={6000} onClose={handleClose} >
  <Alert onClose={handleClose} severity='success' variant='filled'>
    Address updated successfully!
  </Alert>
</Snackbar>
    </>
  );
}
