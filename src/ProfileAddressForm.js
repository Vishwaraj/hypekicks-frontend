import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

  return (
    <div className="cart-address-form-details">
      <form className="cart-address-form profile-address-page" action="">

        <TextField style={profileAddressInputs} id="outlined-basic" label="E-mail" variant="outlined" />

        <div className="address-form-name cart-address-form-name">

          <TextField style={nameStyles} id="outlined-basic" label="First Name" variant="outlined" />
          <TextField style={nameStyles} id="outlined-basic" label="Last Name" variant="outlined" />
        </div>

        <div className='country-area'>
          <label className="form-label country" htmlFor="country">Country</label>
          <p><strong>India</strong></p>
        </div>


        <div className="street-address">

          <TextField id="outlined-basic" placeholder="House number and street name" label="Street Address" variant="outlined" />
          <TextField id="outlined-basic" placeholder="Apartment, suite, unit etc." label="Street Address Continued" variant="outlined" />
        </div>

        <TextField id="outlined-basic" label="Town/City" variant="outlined" />

        <div className='state-select'>
          <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="State"
            style={selectStyle}
          >
            <MenuItem value='Maharashtra'>Maharashtra</MenuItem>
            <MenuItem value='Tamil Nadu'>Tamil Nadu</MenuItem>
            <MenuItem value='Kerala'>Kerala</MenuItem>
          </Select>
        </div>

        <TextField type='number' id="outlined-basic" label="Postcode/ZIP" variant="outlined" />

        <TextField type='number' id="outlined-basic" label="Phone Number" variant="outlined" />

        <Button style={saveAddressButton} variant='outlined' color='inherit'>Save Address</Button>
      </form>
    </div>
  );
}
