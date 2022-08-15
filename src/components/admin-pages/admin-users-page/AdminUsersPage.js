import { Alert, Button, Card, IconButton, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './admin-users-page.css';
import { API } from '../../../global';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom';
import AdminHeader from '../admin-header/AdminHeader';

export default function AdminUsersPage() {

   const adminToken = window.localStorage.getItem('adminToken');

   const [users, setUsers] = useState([]);

    const getUsers = () => {
       try {
        fetch(`${API}/admin/users`, {
            headers: {
                "Content-type": "application/json",
                "admin-auth-token": adminToken
            }
        })
        .then(result => result.json())
        .then(data => {console.log(data); setUsers(data)})
       } catch (error) {
         console.log(error)
       }
    }

    const [open, setOpen] = useState(false);

    const handleDelete = async (id) => {
        try {
            const result = await fetch(`${API}/admin/users`, {
                method: 'DELETE',
                body: JSON.stringify({id: id}),
                headers: {
                    "Content-type": "application/json",
                    "admin-auth-token": adminToken
                }
            })

            const data = await result.json();
            getUsers();
            setOpen(true);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getUsers();
    }, [])

  

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
    <AdminHeader />
        <div className='admin-users-page'>
        <AdminUsersSideBar />
        <div className='admin-users-page-body' >
        {users.map((user) => {
            return <UsersObject handleDelete={handleDelete} user={user} />
        })}
        </div>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
            <Alert elevation={5} variant='filled' severity='warning' onClose={handleClose}>
                User has been deleted successfully!
            </Alert>
        </Snackbar>
    </>
  )
}

export function AdminUsersSideBar() {

    const [loggedOut, setLoggedOut] = useState(false);

    const adminLogout = () => {
        window.localStorage.removeItem('adminToken');
        window.localStorage.removeItem('adminName');
        setLoggedOut(true);
        setTimeout(() => {navigate('/admin-portal')}, 2000)
    }

    const navigate = useNavigate();

    const handleClose = () => {
        setLoggedOut(false)
    }

    return (
        <>
            <div className='admin-users-sidebar'>
            <Button onClick={()=>navigate('/admin/users')} variant='text' color='inherit' ><h2>Users</h2></Button>
            <Button onClick={()=>navigate('/admin/orders')} variant='text' color='inherit' ><h2>Orders</h2></Button>
            <Button onClick={()=>adminLogout()} variant='text' color='inherit' ><h2>Log Out</h2></Button>
            </div>
            <Snackbar open={loggedOut} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity='success' variant='filled'>
                    Log Out Successful, you will be redirected to the admin portal.
                </Alert>
            </Snackbar>
        </>
    )
}


function UsersObject({user, handleDelete}) {

    const userCard = {
        width: '20vw',
        height: '100%'
    }

    const deleteIcon ={
        float: "right"
    }

    

    return (
        <>
            <Card elevation={3} style={userCard}>
            <div className='user-object'>
            <p><strong>Username : </strong>{user.userName}</p>
            <p><strong>First Name : </strong>{user.firstName}</p>
            <p><strong>Last Name : </strong>{user.lastName}</p>
            <p><strong>E-mail : </strong>{user.email}</p>
            {user.address ? 
            <>
            <p><strong>Address : </strong></p>
            <p><strong>Street Address : </strong>{user.address.streetAddress}</p>
            <p><strong>Street Address Continued : </strong>{user.address.streetAddressContd}</p>
            <p><strong>City : </strong>{user.address.city}</p>
            <p><strong>State : </strong>{user.address.state}</p>
            <p><strong>Pin Code : </strong>{user.address.zipcode}</p>
            <p><strong>Phone : </strong>{user.address.phone}</p>
            </>
            :
            <>
            <p><strong>Address : </strong>Address Not Added Yet</p>  
            </>
            }
            </div>
            <IconButton onClick={()=>handleDelete(user._id)} style={deleteIcon}>
            <DeleteIcon style={deleteIcon} color='error' />
            </IconButton>
            </Card>
        </>
    )
}