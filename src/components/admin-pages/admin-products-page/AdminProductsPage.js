import { Alert, Button, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import './admin-products-page.css';
import {useNavigate} from 'react-router-dom';
import AdminHeader from '../admin-header/AdminHeader';

export default function AdminProductsPage() {
  return (
    <>
    <AdminHeader />
        <div className='admin-products-page'>
        <AdminProductsSideBar />
        <div className='admin-products-page-body'>
        <h3>This is the Admin Dashboard, you can view all sneakers, add sneakers, edit sneaker information and remove sneakers.</h3>
        </div>
        </div>
    </>
  )
}


export function AdminProductsSideBar() {

  const [loggedOut, setLoggedOut] = useState(false);

  const adminLogout = () => {
    window.localStorage.removeItem('adminToken');
    window.localStorage.removeItem('adminName');
    setLoggedOut(true);
    setTimeout(()=>{navigate('/admin-portal')}, 2000)
  }


    const navigate = useNavigate();

    const handleClose = () => {
      setLoggedOut(false)
    }

    return (
        <>
            <div className='admin-products-sidebar' >
            <Button onClick={()=>navigate('/admin/products')} variant='text' color='inherit'><h2>Dashboard</h2></Button>
            <Button onClick={()=>navigate('/admin/products/all-sneakers')} variant='text' color='inherit'><h2>All Sneakers</h2></Button>
            <Button onClick={()=>navigate('/admin/products/add-sneakers')} variant='text' color='inherit'><h2>Add Sneaker</h2></Button>
            <Button onClick={()=>adminLogout()} variant='text' color='inherit'><h2>Log Out</h2></Button>
            </div>
            <Snackbar open={loggedOut} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity='success' variant='filled'>
                Log Out Successful, you will be redirected to the admin portal. 
              </Alert>
            </Snackbar>
        </>
    )
}