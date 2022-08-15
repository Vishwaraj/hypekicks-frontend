import { Button } from '@mui/material'
import React from 'react'
import './admin-dashboard-page.css';
import {useNavigate} from 'react-router-dom';
import AdminHeader from '../admin-header/AdminHeader';

export default function AdminDashboardPage() {

    const adminDashboardButtons = {
        width: "25vw",
        height: "15vh"
    }

    const navigate= useNavigate();

  return (
   <>
   <AdminHeader/>
    <div className='admin-dashboard-page'>
      <div className='admin-dashboard-buttons' >
       <Button onClick={()=>navigate('/admin/products')} style={adminDashboardButtons} variant='outlined' color='inherit' >Products</Button>
       <Button onClick={()=>navigate('/admin/users')} style={adminDashboardButtons} variant='outlined' color='inherit' >Users</Button>
      </div>
    </div>
   </>
  )
}
