import { Button } from '@mui/material'
import React from 'react'
import './admin-products-page.css';
import {useNavigate} from 'react-router-dom';

export default function AdminProductsPage() {
  return (
    <>
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

    const navigate = useNavigate();

    return (
        <>
            <div className='admin-products-sidebar' >
            <Button onClick={()=>navigate('/admin/products')} variant='text' color='inherit'><h2>Dashboard</h2></Button>
            <Button onClick={()=>navigate('/admin/products/all-sneakers')} variant='text' color='inherit'><h2>All Sneakers</h2></Button>
            <Button onClick={()=>navigate('/admin/products/add-sneakers')} variant='text' color='inherit'><h2>Add Sneaker</h2></Button>
            </div>
        </>
    )
}