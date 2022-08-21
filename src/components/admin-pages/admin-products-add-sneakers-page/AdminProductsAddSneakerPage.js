import { Alert, Button, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { AdminProductsSideBar } from '../admin-products-page/AdminProductsPage'
import './admin-products-add-sneakers-page.css'
import {useFormik} from 'formik';
import * as yup from 'yup';
import { API } from '../../../global';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../admin-header/AdminHeader';
import UploadFileIcon from '@mui/icons-material/UploadFile';



// sneaker validation schema 
const sneakerValidationSchema = yup.object({
  name: yup.string().required('This is a required field'),
  image: yup.mixed().required('This is a required field'),
  description: yup.string().required('This is a required field').min(300, 'Minimum 400 characters required'),
  category: yup.string().required('This is a required field'),
  price: yup.number().required('This is a required field')
}); 



//function to check valid image url -->
const testImage = (url) => {

  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
   
 
   img.onload = function () {
     resolve(true)
   }
 
   img.onerror = function () {
     reject(false)
   }
  })
  }


export default function AdminProductsAddSneakerPage() {


  //styles for category select
  const categorySelect = {
    width: "41vw"
  }


  //formik initialization
  const {handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue, setFieldTouched } = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
      category: "",
      price: 0
    },
    validationSchema: sneakerValidationSchema,
    onSubmit: (sneaker) => {
      console.log('this is the added sneaker', sneaker);

      const formData = new FormData();
      formData.append('name', values.name)
      formData.append('image', values.image)
      formData.append('description', values.description)
      formData.append('category', values.category)
      formData.append('price', values.price)


      addSneaker(formData);
    }
  })


  //getting admin token
  const adminToken = window.localStorage.getItem('adminToken');


  //setting snackbar state
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  //function to add sneaker
  const addSneaker = async (sneaker) => {
    try {

      console.log('This is the function sneaker', sneaker)
      const result = await fetch(`${API}/admin/products/add-sneakers`, {
        method: "POST",
        body: sneaker,
        headers: {
          "admin-auth-token": adminToken
        }
      })

      const data = await result.json();

      console.log(data);
      setOpen(true);

      setTimeout(() => {
      navigate('/admin/products/all-sneakers')
      }, 2000)
    } catch (error) {
      console.log(error);
    }
  }



  //function to close snackbar
  const handleClose = () => {
   setOpen(false);
  }

  return (
    <>
    <AdminHeader />
        <div className='admin-products-add-sneakers-page'>
        <AdminProductsSideBar />
        <div >
        <h3>Add a Sneaker</h3>
        <form onSubmit={handleSubmit} className='add-sneakers-form'>
            
            <TextField onChange={handleChange} onBlur={handleBlur} name="name" value={values.name}
            error={touched.name && errors.name ? true : false} helperText={touched.name && errors.name ? errors.name : null}
            label='Sneaker Name' type='string' />
            
            {touched.name && errors.name ? errors.name : null}

            <TextField onChange={handleChange} onBlur={handleBlur} name='price' value={values.price}
            error={touched.price && errors.price ? true : false} helperText={touched.price && errors.price ? errors.price : null}
            label='Sneaker Price' type='number' />
            
            <div className='upload-image-area'>
            <label className='upload-image-label'>
            <input
                 type="file"
                 className='upload-image-input'
                 onChange={(event) => {
                 setFieldValue('image', event.currentTarget.files[0]);
                 }} 
                 onBlur={handleBlur} name='image'
               />
            </label>
            </div>
            
            
            <div className='add-sneakers-category-select'>
            <InputLabel >Select Category</InputLabel>
            <Select onChange={handleChange} onBlur={handleBlur} name='category' value={values.category}
            error={touched.category && errors.category ? true : false} helperText={touched.category && errors.category ? errors.category : null}
            style={categorySelect}>
              <MenuItem value='every day' >Every Day</MenuItem>
              <MenuItem value='new-releases' >New Releases</MenuItem>
              <MenuItem value='popular' >Popular</MenuItem>
              <MenuItem value='trending' >Trending</MenuItem>
            </Select>
            </div>
            
            <TextField multiline onChange={handleChange} onBlur={handleBlur} name='description' value={values.description}
            error={touched.description && errors.description ? true : false} helperText={touched.description && errors.description ? errors.description : null}
             label='Sneaker Description' type='string' />
            
            <Button type='submit' variant='outlined' color='inherit' >Add Sneaker</Button>
        
        </form>

        </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
          <Alert onClose={handleClose} severity='success' variant='filled'>
            Sneaker successfully added. You will be redirected to All Sneakers page.
          </Alert>
        </Snackbar>
    </>
  )
}
