import React, { useEffect, useState } from 'react';
import { AdminUsersSideBar } from './AdminUsersPage';
import './admin-users-page.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../../global';
import { Alert, Button, Card, CardContent, CardMedia, IconButton, Modal, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';



export function SingleUserPage() {

    //getting username param from url
    const {username} = useParams();

    //getting admin token
    const adminToken = window.localStorage.getItem('adminToken');


    //state for single user
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState(null)


    const getUser = async () => {
       try {
        const result = await fetch(`${API}/admin/users/${username}`)

        const data = await result.json();

        setUser(data.userData);
        setOrders(data.orders);

       } catch (error) {
        console.log(error);
       }
    }

    useEffect(() => {
        getUser();
    }, [])

    
    //state for modal
    const [open, setOpen] = useState(false);
    
    //state for snackbar
    const [barOpen, setBarOpen] = useState(false);

    const navigate = useNavigate();

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
            
            setBarOpen(true);
            setTimeout(() => {navigate('/admin/users')}, 2000)
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        border: '1px solid grey',
        borderRadius: '1rem',
        boxShadow: 24,
        p: 4,
      };

  

    const handleBarClose = () => {
        setBarOpen(false);
      }


    return (
        <>
            <div className='single-user-page'>
                <AdminUsersSideBar />
                {user && orders ?  
                    <div className='single-user-body'>
                    <div className='username-delete'>
                        <p><strong>Username : {username}</strong></p>
                        <IconButton onClick={()=>setOpen(true)} color='error' >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <div className='first-last-name' >
                        <p className='margin-fix' ><strong>First Name : </strong>{user.firstName}</p>
                        <p className='margin-fix' ><strong>Last Name : </strong>{user.lastName}</p>
                    </div>
                    <div className='first-last-name' style={{borderBottom: '1px solid grey', width: '100%'}} >
                    <p className='margin-fix' ><strong>E-mail : </strong>{user.email}</p>

                    <p className='margin-fix' ><strong>Phone : </strong>{user.address ? user.address.phone : 'Not Added'}</p>
                    </div>

                    {user.address ? 
                    <>
                    <p><strong>Address : </strong></p>
                    <div className='address-area'>
                    <div className='first-last-name' >
                    <p className='margin-fix' ><strong>Street Address : </strong>{user.address.streetAddress}</p>
                    <p className='margin-fix' ><strong>Street Address Continued : </strong>{user.address.streetAddressContd}</p>
                    </div>
                    <div className='first-last-name' style={{borderBottom: '1px solid grey', width: '100%', paddingBottom: '0.5rem'}} >
                    <p className='margin-fix' ><strong>City : </strong>{user.address.city}</p>
                    <p className='margin-fix' ><strong>State : </strong>{user.address.state}</p>
                    <p className='margin-fix' ><strong>Pincode : </strong>{user.address.zipcode}</p>
                    </div>
                    </div>
                    </>

                    : <>
                    <p><strong>Address : </strong></p>
                    <p><strong>Not Found</strong></p>
                    </>
                    
                    }


                    <p><strong>Orders : </strong></p>
                    <div className='orders-area' >

                    {
                        orders ?
                        <>
                        {orders.map((order) => {
                        return <OrdersAreaBody order={order} sneakers={order.sneakers} />
                         })}
                        </>

                        : <>
                       <p>No Orders Yet</p>
                       </> 
                    }


                    </div>
                </div>
                :
                <h2>Loading...</h2>
                }

            </div>

            <Modal open={open} onClose={handleClose} >
            <Box style={style} >
            <div className='delete-modal' >
            <h3>Do you want to delete this user ?</h3>
                <div className='delete-button' >
                <Button variant='outlined' color='primary' onClick={()=>setOpen(false)} >No</Button>
                <Button variant='outlined' color='error' onClick={()=>handleDelete(user._id)} >Delete</Button>
                </div>
            </div>
            </Box>
            </Modal>

            <Snackbar open={barOpen} autoHideDuration={6000} onClose={handleBarClose} >
            <Alert elevation={5} variant='filled' severity='warning' onClose={handleBarClose}>
                User has been deleted successfully!
            </Alert>
        </Snackbar>

        </>
    );
}


function OrdersAreaBody({order, sneakers}) {

    sneakers.forEach((sneaker) => {
        Number(sneaker.price);
    })

    let total = 0;
    if(sneakers.length > 1) {
        total = sneakers.reduce((acc, curr) => (acc.quantity*acc.price) + (curr.quantity*curr.price));
        console.log(typeof total)
    } else {
        total = sneakers[0].price*sneakers[0].quantity;
        console.log(typeof total)
    }



    return (
        <>
            <div className='single-order-body'>
            <Card>
            <CardContent>
            <p className='margin-fix' ><strong>Date : </strong>{order.date}</p>
            <p className='margin-fix' ><strong>Amount : </strong>Rs {total}</p>
            <div className='orders-list' >
            {sneakers.map((sneaker) => {
                return <SingleOrderProduct sneaker={sneaker} />
            })}
            </div>

            </CardContent>
                
            </Card>
            </div>

        </>
    )
}

function SingleOrderProduct({sneaker}) {

    let binaryImage = null;
    if(sneaker.image) {
        if(sneaker.image.length > 10000) {
          binaryImage = `data:image/jpeg;base64,${sneaker.image}`
        }
    }


    const singleStyles = {
        width: '15vw'
    }

    return (
        <>
            <div className='single-product' >
            <Card elevation={3} style={singleStyles}>
            <CardMedia
             component="img"
             height="140"
             image={binaryImage !== null ? binaryImage : sneaker.image}
             alt="green iguana"
             />
             <CardContent>
                <p className='margin-fix product-card-fix ' >{sneaker.name}</p>
                <p className='margin-fix product-card-fix ' ><strong>Price : </strong>Rs {sneaker.price}</p>
                <p className='margin-fix product-card-fix ' ><strong>Quantity : </strong>{sneaker.quantity}</p>
             </CardContent>

            </Card>
            </div>
        </>
    )
}
