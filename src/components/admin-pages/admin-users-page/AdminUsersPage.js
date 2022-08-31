import { Alert, Button, Card, CardActions, CardContent, IconButton, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './admin-users-page.css';
import { API } from '../../../global';
import {useNavigate} from 'react-router-dom';
import AdminHeader from '../admin-header/AdminHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function AdminUsersPage() {

    //getting admin token
   const adminToken = window.localStorage.getItem('adminToken');


   //setting state for users array
   const [users, setUsers] = useState([]);


   //function to get all users -->
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


    //state for snackbar


    //function to delete user -->
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
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getUsers();
    }, [])

  
  //function to close snackbar


  const navigate = useNavigate();

  return (
    <>
    <AdminHeader />
        <div className='admin-users-page'>
        <AdminUsersSideBar />
        <div className='admin-users-page-body' >
        <Table style={{width: '67vw', border: '1px solid grey'}} >
            <TableHead>
                <TableRow>
                    <TableCell style={{backgroundColor: '#212529', color:'white'}}>First Name</TableCell>
                    <TableCell style={{backgroundColor: '#212529', color:'white'}} >Last Name</TableCell>
                    <TableCell style={{backgroundColor: '#212529', color:'white'}} >Username</TableCell>
                    <TableCell style={{backgroundColor: '#212529', color:'white'}} >Options</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => {
                    return <TableRow>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell><Button 
                        onClick={()=>navigate(`/admin/users/${user.userName}`)}
                         variant='contained' color='primary' >View More</Button></TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>

        {/* {users.map((user) => {
            return <UsersObject handleDelete={handleDelete} user={user} />
        })} */}
        </div>
        </div>

    </>
  )
}

export function AdminUsersSideBar() {

    //setting state for snackbar
    const [loggedOut, setLoggedOut] = useState(false);

    const adminSideBarStyle = {
        width: '20vw'
    }

    //function for admin logout -->
    const adminLogout = () => {
        window.localStorage.removeItem('adminToken');
        window.localStorage.removeItem('adminName');
        setLoggedOut(true);
        setTimeout(() => {navigate('/admin-portal')}, 2000)
    }

    const navigate = useNavigate();

   
    //function to close snackbar -->
    const handleClose = () => {
        setLoggedOut(false)
    }

    return (
        <>
            <div className='admin-users-sidebar'>
            <Button style={adminSideBarStyle} onClick={()=>navigate('/admin/users')} variant='text' color='inherit' ><h2>Users</h2></Button>
            <Button style={adminSideBarStyle} onClick={()=>navigate('/admin/orders')} variant='text' color='inherit' ><h2>Orders</h2></Button>
            <Button style={adminSideBarStyle} onClick={()=>adminLogout()} variant='text' color='inherit' ><h2>Log Out</h2></Button>
            </div>
            <Snackbar open={loggedOut} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity='success' variant='filled'>
                    Log Out Successful, you will be redirected to the admin portal.
                </Alert>
            </Snackbar>
        </>
    )
}


