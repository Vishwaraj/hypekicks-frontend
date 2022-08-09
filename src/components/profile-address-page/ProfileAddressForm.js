import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { globalContext } from '../../App';
import { useContext } from 'react';
import {API} from '../../global';


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



export function ProfileAddressForm() {

  const selectStyle = {
    width: '10vw',
    marginLeft: '1rem'
  };

  const saveAddressButton = {
    marginTop: '1rem'
  };

  const profileAddressInputs = {
    width: '100%'
  };

  const nameStyles = {
    width: '29vw'
  };

  // formik code -

  const {handleChange, handleBlur, handleSubmit, values, errors, touched} = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      streetAddress: '',
      streetAddressContd: '',
      city: '',
      state: '',
      zipcode: '',
      phone: ''
    },
    validationSchema: addressValidationSchema,
    onSubmit: (address, {resetForm}) => {
      console.log('This is the user address', address);
      addUserAddress(address, user);
    }
  })

  //getting the user name from context -
  const {user} = useContext(globalContext)

  const addUserAddress = (address, user) => {

    fetch(`${API}/profile-page/addresses`, {
      method: 'PUT',
      body: JSON.stringify(address),
      headers: {
        "Content-type": "application/json",
        username: user.username
      }
    }) 
    .then(result => result.json())
    .then(data => console.log(data)) 

  }



  return (
    <div className="cart-address-form-details">
      <form onSubmit={handleSubmit} className="cart-address-form profile-address-page" action="">

        <TextField onChange={handleChange} onBlur={handleBlur} value={values.email}
        name='email' error={touched.email && errors.email ? errors.email : null}
         style={profileAddressInputs} id="outlined-basic" label="E-mail" variant="outlined" />

        <div className="address-form-name cart-address-form-name">

          <TextField onChange={handleChange} onBlur={handleBlur} value={values.firstName}
        name='firstName' error={touched.firstName && errors.firstName ? errors.firstName : null}
           style={nameStyles} id="outlined-basic" label="First Name" variant="outlined" />
         
          <TextField onChange={handleChange} onBlur={handleBlur} value={values.lastName}
        name='lastName' error={touched.lastName && errors.lastName ? errors.lastName : null}
           style={nameStyles} id="outlined-basic" label="Last Name" variant="outlined" />
        
        </div>

        <div className='country-area'>
          <label className="form-label country" htmlFor="country">Country</label>
          <p><strong>India</strong></p>
        </div>


        <div className="street-address">

          <TextField onChange={handleChange} onBlur={handleBlur} value={values.streetAddress}
        name='streetAddress' error={touched.streetAddress && errors.streetAddress ? errors.streetAddress : null}
          id="outlined-basic" placeholder="House number and street name" label="Street Address" variant="outlined" />
          
          <TextField onChange={handleChange} onBlur={handleBlur} value={values.streetAddressContd}
        name='streetAddressContd' error={touched.streetAddressContd && errors.streetAddressContd ? errors.streetAddressContd : null}
          id="outlined-basic" placeholder="Apartment, suite, unit etc." label="Street Address Continued" variant="outlined" />
       
        </div>

        <TextField onChange={handleChange} onBlur={handleBlur} value={values.city}
        name='city' error={touched.city && errors.city ? errors.city : null}
         id="outlined-basic" label="Town/City" variant="outlined" />

        <div className='state-select'>
          <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="State"
            style={selectStyle}
            onChange={handleChange} onBlur={handleBlur} value={values.state}
        name='state' error={touched.state && errors.state ? errors.state : null}
          >
            <MenuItem value='Maharashtra'>Maharashtra</MenuItem>
            <MenuItem value='Tamil Nadu'>Tamil Nadu</MenuItem>
            <MenuItem value='Kerala'>Kerala</MenuItem>
          </Select>
        </div>

        <TextField  onChange={handleChange} onBlur={handleBlur} value={values.zipcode}
        name='zipcode' error={touched.zipcode && errors.zipcode ? errors.zipcode : null}
         type='number' id="outlined-basic" label="Postcode/ZIP" variant="outlined" />

        <TextField onChange={handleChange} onBlur={handleBlur} value={values.phone}
        name='phone' error={touched.phone && errors.phone ? errors.phone : null}
        type='number' id="outlined-basic" label="Phone Number" variant="outlined" />

        <Button type='submit' style={saveAddressButton} variant='outlined' color='inherit'>Save Address</Button>
      </form>
    </div>
  );
}
