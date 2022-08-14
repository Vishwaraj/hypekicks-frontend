import { Alert, Button, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AdminProductsSideBar } from '../admin-products-page/AdminProductsPage'
import './admin-products-update-sneakers-page.css';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../../global';



const sneakerValidationSchema = yup.object({
    name: yup.string().required('This is a required field'),
    image: yup.string().required('This is a required field').test('checkValidImageURL', 'Must use valid image URL', value => testImage(value).then(()=>{return true}).catch(err=>{return false})),
    description: yup.string().required('This is a required field').min(400, 'Minimum 400 characters required'),
    category: yup.string().required('This is a required field'),
    price: yup.number().required('This is a required field')
  }); 

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




export default function AdminProductsUpdateSneakersPage() {

    const {id} = useParams();
    const adminToken = window.localStorage.getItem('adminToken');

    const [sneaker, setSneaker] = useState(null);


const getRequiredSneaker = async () => {
    try {
        const result = await fetch(`${API}/admin/products/update-sneakers/${id}`, {
            headers: {
                "Content-type": "application/json",
                "admin-auth-token": adminToken
            }
        })

        const data = await result.json();
        setSneaker(data);
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

    useEffect(() => {
    getRequiredSneaker();
    }, [])


  return (
    <>
        <div className='admin-products-update-sneakers-page'>
        <AdminProductsSideBar/>
        <div className='admin-products-update-sneakers-body'>
        <h3>Update Sneaker</h3>
        {sneaker ?
        <>
        <EditSneakerForm sneaker={sneaker} adminToken={adminToken} id={id} />
        </>
        :
        <h3>Loading...</h3>
        }


        </div>
        </div>
    </>
  )
}



function EditSneakerForm ({sneaker, id, adminToken}) {

    const [updated, setUpdated] = useState(false);
    const navigate = useNavigate();

    const categorySelect = {
        width: "41vw"
      }


    const {handleSubmit, handleChange, handleBlur, values, errors, touched} = useFormik({
        initialValues: {
          name: sneaker.name,
          image: sneaker.image,
          description: sneaker.description,
          category: sneaker.category,
          price: sneaker.price
        },
        validationSchema: sneakerValidationSchema,
        onSubmit: (sneaker) => {
          console.log('this is the added sneaker', sneaker);
          updateSneaker(sneaker)
        }
      })


      const updateSneaker = async (sneaker) => {
            try {
                const result = await fetch(`${API}/admin/products/update-sneakers/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(sneaker),
                    headers: {
                        "Content-type": "application/json",
                        "admin-auth-token": adminToken
                    }
                })

                const data = await result.json();
                setUpdated(true);

                console.log(data);
                setTimeout(()=>{ navigate('/admin/products/all-sneakers')}, 2000)

            } catch (error) {
                console.log(error);
            }
      }

      const handleClose = () => {
        setUpdated(false);
      }

    return (
        <>
        <div className='update-sneakers-form'>
        <form onSubmit={handleSubmit} className='add-sneakers-form'>
            
            <TextField onChange={handleChange} onBlur={handleBlur} name="name" value={values.name}
            error={touched.name && errors.name ? true : false} helperText={touched.name && errors.name ? errors.name : null}
            label='Sneaker Name' type='string' />
            
            {touched.name && errors.name ? errors.name : null}

            <TextField onChange={handleChange} onBlur={handleBlur} name='price' value={values.price}
            error={touched.price && errors.price ? true : false} helperText={touched.price && errors.price ? errors.price : null}
            label='Sneaker Price' type='number' />
            
            <TextField onChange={handleChange} onBlur={handleBlur} name='image' value={values.image}
            error={touched.image && errors.image ? true : false} helperText={touched.image && errors.image ? errors.image : null}
            label='Sneaker Image' type='string' />
            
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
            
            <Button type='submit' variant='outlined' color='inherit' >Update Sneaker</Button>
        
        </form>
        </div>
        <Snackbar open={updated} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} severity='success' variant='filled' >
            Sneaker updated Successfully! You will be redirected to All Sneakers page.
            </Alert>
        </Snackbar>
        </>
    )
}