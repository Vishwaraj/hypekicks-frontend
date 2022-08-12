import './admin-portal-page.css';
import React from 'react'
import adminPortalImage from '../../../images/admin-portal-page.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function AdminPortalPage() {

    const navigate = useNavigate();

    const adminPortalButtons = {
        height: "10vh",
        width: "20vw"
    }

  return (
    <div className='admin-portal-page'>
    <img src={adminPortalImage} alt='admin-portal-braces' />
    <div className='admin-buttons' >
    <Button onClick={()=>navigate('/admin/login')} style={adminPortalButtons} color='inherit' variant='outlined' >Login</Button>
    <Button onClick={()=>{navigate('/admin/sign-up')}} style={adminPortalButtons} color='inherit' variant='outlined' >Create Admin Account</Button>
    </div>
    </div>
  )
}