import './admin-portal-page.css';
import React from 'react'
import adminPortalImage from '../../../images/admin-portal-page.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../admin-header/AdminHeader';


export default function AdminPortalPage() {

    const navigate = useNavigate();

    const adminPortalButtons = {
        height: "10vh",
        width: "20vw"
    }

    const adminToken = window.localStorage.getItem('adminToken');

  return (
    <>
    <AdminHeader />
    <div className='admin-portal-page'>
    <img src={adminPortalImage} alt='admin-portal-braces' />
    <div className='admin-buttons' >

    {adminToken ? 
    <>
    <h3>You are logged in as Admin</h3>
    <Button onClick={()=>navigate('/admin/dashboard')} style={adminPortalButtons} color='inherit' variant='outlined'  >Continue to Admin Dashboard</Button>
    </>
    :
    <>
    <Button onClick={()=>navigate('/admin/login')} style={adminPortalButtons} color='inherit' variant='outlined' >Login</Button>
    <Button onClick={()=>{navigate('/admin/sign-up')}} style={adminPortalButtons} color='inherit' variant='outlined' >Create Admin Account</Button>
    </>
    
    }

   
    </div>
    </div>
    </>

  )
}
