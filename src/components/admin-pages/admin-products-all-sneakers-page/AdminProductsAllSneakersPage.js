import { Alert, Card, CardActions, CardContent, CardMedia, IconButton, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API } from '../../../global';
import { AdminProductsSideBar } from '../admin-products-page/AdminProductsPage'
import './admin-products-all-sneakers-page.css';
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../admin-header/AdminHeader';



export default function AdminProductsAllSneakersPage() {


    //setting states for sneakers, snackbar ,and pagination
    const [allSneakers, setAllSneakers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sneakersPerPage] = useState(10);
    const [deleted , setDeleted] = useState(false);


    //function to close snackbar -->
    const handleClose = () => {
        setDeleted(false);
    }


    //getting admin token
    const adminToken = window.localStorage.getItem('adminToken');


    //function to get sneakers -->
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


    //function to delete sneaker -->
    const deleteSneaker = async (id) => {
        try {
            const result = await fetch(`${API}/admin/products/all-sneakers`, {
                method: 'DELETE',
                body: JSON.stringify({id: id}),
                headers:{
                    "Content-type": "application/json",
                    "admin-auth-token": adminToken
                }
            })

            const data = await result.json();

            console.log(data);
            setDeleted(true)
            getSneakers();
        } catch (error) {
            console.log(error);
        }
    }


    //creating pagination count
    const paginationCount = Math.ceil(allSneakers.length / sneakersPerPage);

    //get current sneakers ->
    const indexOfLastSneaker = currentPage * sneakersPerPage;
    const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;

    const currentSneakers = allSneakers.slice(indexOfFirstSneaker, indexOfLastSneaker)

    // const [binary, setBinary] = useState(false);
    let binaryImage = ''

  return (
    <>
    <AdminHeader />
    <div className='admin-products-all-sneakers-page'>
    <AdminProductsSideBar />
    <div className='admin-products-all-sneakers-body'>
    <h3>All Sneakers</h3>
    {currentSneakers.map((sneaker) => {
        return <SneakersCard binaryImage={binaryImage} key={sneaker._id} deleteSneaker={deleteSneaker} sneaker={sneaker} />
    })}
    <Pagination count={paginationCount} onChange={(event, value)=>setCurrentPage(value)} color='primary' />
    </div>
    
    </div>
    <Snackbar open={deleted} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning' variant='filled' >
            Sneaker has been deleted Successfully!
        </Alert>
    </Snackbar>
    </>
  )
}


function SneakersCard({sneaker, deleteSneaker}) {

    let binaryImage = null;

    if(sneaker.image.length > 10000) {
        binaryImage = `data:image/jpeg;base64,${sneaker.image}`
    }

    //styles for sneakers card
    const sneakerCardStyles = {
        width: "70vw",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem'
    }

    const cardImage ={
        width: '25vw',
        height: '100%',
        objectFit: 'cover'
    }

    const cardActionStyles = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }

    const descriptionStyle = {
        fontSize: '0.9rem'
    }

    const navigate = useNavigate();

    return (
        <>
            <Card elevation={3} style={sneakerCardStyles} >
                <CardMedia
                component='img'
                style={cardImage}
                image={binaryImage !== null ? binaryImage : sneaker.image}
                alt={sneaker.name}
                 />
                 <CardContent>
                 <div className='sneaker-card-content'>
                <div className='sneaker-card-data'>
                <h4>Name : {sneaker.name}</h4>
                <h4>Price : Rs {sneaker.price}</h4>
                <h4>Category : {sneaker.category}</h4>
                </div>
                <p style={descriptionStyle} ><strong>Description</strong> : {sneaker.description}</p>
                <CardActions style={cardActionStyles} >
                    <IconButton onClick={()=>navigate(`/admin/products/update-sneakers/${sneaker._id}`)} >
                    <EditIcon color='success' />
                    </IconButton>
                    <IconButton onClick={()=>deleteSneaker(sneaker._id)} >
                    <DeleteIcon color='error'  />
                    </IconButton>
                 </CardActions>
                 </div>
                 </CardContent>
                 
            </Card>
        </>
    )
}