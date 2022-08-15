import React, { useEffect, useState } from 'react'
import './admin-orders-page.css';
import { AdminUsersSideBar } from '../admin-users-page/AdminUsersPage';
import { Card, CardContent, CardMedia } from '@mui/material';
import { API } from '../../../global';
import AdminHeader from '../admin-header/AdminHeader';

export default function AdminOrdersPage() {

const [orders, setOrders] = useState([]);

const adminToken = window.localStorage.getItem('adminToken');

const getOrders = async () => {
    try {
        const result = await fetch(`${API}/admin/orders`, {
            headers: {
                "Content-type": "application/json",
                "admin-auth-token": adminToken
            }
        })

        const data = await result.json();
        setOrders(data);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    getOrders();
}, [])

  return (
    <>
    <AdminHeader/>
       <div className='admin-orders-page'>
         <AdminUsersSideBar />
         <div className='admin-orders-page-body'>
         <h3>Order from Users</h3>
         {orders.map((order) => {
            return <UserOrderBody order={order} />
         }) }
         </div>
       </div>
    </>
  )
}


function UserOrderBody({order}) {
    
    const orderCard = {
        width: '15vw',
        height: '100%'
    }

    const cardContentStyle1 = {
        marginTop: 0, 
        marginBottom: "0.5rem"
    }

    const cardContentStyle2 = {
        marginBottom: 0, 
        marginTop: 0
    }

    return (
        <>
            <Card elevation={3}>
            <div className='user-order-body'>
            <p><strong>Username : </strong>{order.user}</p>
            <p><strong>Order placed on : {order.date}</strong></p>
            <p><strong>Sneakers Ordered : </strong></p>
            <div className="orders-card-list" >
            {order.sneakers.map((sneaker) => {
                return  <Card elevation={5} style={orderCard}>
                <CardMedia
                component='img'
                height= "140"
                image={sneaker.image}
                alt={sneaker.name}
                 />
                 <CardContent>
                    <h4 style={cardContentStyle1}>{sneaker.name}</h4>
                    <h4 style={cardContentStyle1} >Size : {sneaker.size}</h4>
                    <h4 style={cardContentStyle1} >Quantity : {sneaker.quantity}</h4>
                    <h4 style={cardContentStyle2} >Price : {sneaker.price}</h4>
                 </CardContent>
            </Card>
            })}
            </div>
            </div>
            </Card>
            
        </>
    )
}