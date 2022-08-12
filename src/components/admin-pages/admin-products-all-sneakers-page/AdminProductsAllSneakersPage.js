import { Card, CardContent, CardMedia } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API } from '../../../global';
import { AdminProductsSideBar } from '../admin-products-page/AdminProductsPage'
import './admin-products-all-sneakers-page.css';
import Pagination from '@mui/material/Pagination';



export default function AdminProductsAllSneakersPage() {

    const [allSneakers, setAllSneakers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sneakersPerPage] = useState(10);

    const adminToken = window.localStorage.getItem('adminToken');

    const getSneakers = async () => {
     try {
        const result = await fetch(`${API}/admin/products/all-sneakers`, {
            headers: {
                "Content-type": "application/json",
                "admin-auth-token": adminToken
            }
        })

        const data = await result.json();

        setAllSneakers(data);

     } catch (error) {
        console.log(error);
     }
    }

    useEffect(() => {
        getSneakers();
    }, [])

    const paginationCount = Math.ceil(allSneakers.length / sneakersPerPage);

    //get current sneakers ->
    const indexOfLastSneaker = currentPage * sneakersPerPage;
    const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;

    const currentSneakers = allSneakers.slice(indexOfFirstSneaker, indexOfLastSneaker)

  return (
    <>
    <div className='admin-products-all-sneakers-page'>
    <AdminProductsSideBar />
    <div className='admin-products-all-sneakers-body'>
    <h3>All Sneakers</h3>
    {currentSneakers.map((sneaker) => {
        return <SneakersCard sneaker={sneaker} />
    })}
    <Pagination count={paginationCount} onChange={(event, value)=>setCurrentPage(value)} color='primary' />
    </div>
    
    </div>
    </>
  )
}


function SneakersCard({sneaker}) {

    const sneakerCardStyles = {
        width: "70vw",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '2rem'
    }

    const cardImage ={
        width: '50vw',
        height: '50vh'
    }

    return (
        <>
            <Card elevation={3} style={sneakerCardStyles} >
                <CardMedia
                component='img'
                style={cardImage}
                image={sneaker.image}
                alt={sneaker.name}
                 />
                 <CardContent>
                 <div className='sneaker-card-content'>
                <div className='sneaker-card-data'>
                <h4>Name : {sneaker.name}</h4>
                <h4>Price : {sneaker.price}</h4>
                <h4>Category : {sneaker.category}</h4>
                </div>
                <p><strong>Description</strong> : {sneaker.description}</p>
                 </div>
                 </CardContent>
            </Card>
        </>
    )
}