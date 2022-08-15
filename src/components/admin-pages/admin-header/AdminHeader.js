import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../../App.css'


export default function AdminHeader() {

    const appBarStyles = {
        backgroundColor: '#212529',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      };


      const navigate = useNavigate();

      const adminToken = window.localStorage.getItem('adminToken');

  return (
    <>
      <AppBar style={appBarStyles}>
      <h1 className='title'>HYPE KICKS</h1>

      <Toolbar>
        <div className='header-buttons'>
        {adminToken ? <Button variant='text' color='inherit' onClick={()=>navigate('/admin/dashboard')} >
            Admin Dashboard
        </Button> : null }
        
        </div>
      </Toolbar>
    </AppBar>
    </>
  )
}
