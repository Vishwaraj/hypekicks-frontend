import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';


export function SideBar({handleClick, setClicked, clicked}) {

  //styles for text color
  const textColor = {
    color: 'white',
    fontSize: '1.5rem'
  };

  const navigate = useNavigate();

  
  //getting category from url params
  const {category} = useParams()

  

  return (

    <div className="sidebar">
      <div className="sidebar-buttons">

      <Button style={textColor}   variant="text" onClick={(event) => {handleClick(event); setClicked(!clicked)}} value={'new-releases'} color='inherit'
       disabled={category === 'new-releases' ? true : false}
      >New Releases</Button>


        <Button style={textColor}  variant="text" onClick={(event)=>{handleClick(event); }} value={'popular'} color='inherit'
        disabled={category === 'popular' ? true : false}
        >Popular</Button>

       
        <Button style={textColor}  variant="text" onClick={(event)=>{handleClick(event); }} value={'trending'} color='inherit'
        disabled={category === 'trending' ? true : false}
        >Trending</Button>

        <Button style={textColor}  variant="text" onClick={(event)=>{handleClick(event); }} value={'all'} color='inherit'
        disabled={category === 'all' ? true : false}
        >All</Button>

      </div>
    </div>
  );
}
export function SearchBar({setSearchTerm, searchTerm, handleSearch}) {

  return (
    <div>
      <form className='search-bar'>
        <TextField style={{width: "30rem"}} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type='text' id="outlined-basic" variant="outlined" />

        <Button onClick={(event)=>handleSearch(event,searchTerm)} type='submit' variant="outlined" color='inherit'>Search</Button>
      </form>
    </div>
  );
}


function SingleProduct({sneaker}) {

  const navigate = useNavigate();


  //style for cursor
  const cursorStyle = {
    cursor: 'pointer',
    marginTop: 0,
    marginBottom: 0,
  }

  

  return (
    <div className='single-shoe'>
      <Card >
        <CardMedia
          component="img"
          height="250"
          image={sneaker.image} alt='nike-shoes' 
          style={{objectFit: "contain"}}
          />
        <CardContent>
          <h4 style={cursorStyle} onClick={() => {navigate('/home/single-product/'+sneaker._id);}}>{sneaker.name}</h4>
          <h5 style={{marginBottom: 0}}>Rs {sneaker.price}</h5>
        </CardContent>
      </Card>
    </div>
  );
}


export function ProductsList({homeProducts, searchedProducts}) {


  //conditional rendering by checking whether searched products exist
  return (
    <div className='products-list'>
    { 
      searchedProducts ? 
     
      searchedProducts.map((sneaker)=> {
    return <SingleProduct key={sneaker._id} sneaker={sneaker} />
  })

       : homeProducts.map((sneaker)=> {
    return <SingleProduct key={sneaker._id} sneaker={sneaker} />
  })

  
  }

    </div>
  );
}
