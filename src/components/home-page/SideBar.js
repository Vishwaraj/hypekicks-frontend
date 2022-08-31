import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export function SideBar({handleClick, setClicked, clicked, sort, handleSort }) {

  //styles for text color
  const textColor = {
    color: 'white',
    fontSize: '1.4rem'
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

        <FormControl style={{marginTop: '1rem'}} >
        <InputLabel style={{color: 'white'}} >Sort by Price</InputLabel>
        <Select
        label="Sort by Price"
        value={sort}
        onChange={(e)=>handleSort(e.target.value)}
        style={{color: 'white', width: "12vw"}}
         >
          <MenuItem value='low-to-high' >Low to High</MenuItem>
          <MenuItem value='high-to-low' >High to Low</MenuItem>
        </Select>
        </FormControl>
        

      </div>
    </div>
  );
}
export function SearchBar({setSearchTerm, searchTerm, handleSearch}) {

  return (
    <div>
      <form className='search-bar'>
        <TextField style={{width: "25rem"}} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type='text' id="outlined-basic" variant="outlined" />

        <Button onClick={(event)=>handleSearch(event,searchTerm)} type='submit' variant="outlined" color='inherit'>Search</Button>
      </form>
    </div>
  );
}


function SingleProduct({sneaker}) {

  let binaryImage = null
  if(sneaker.image.length > 10000) {
  binaryImage = `data:image/jpeg;base64,${sneaker.image}`
  }

  const navigate = useNavigate();


  //style for cursor
  const cursorStyle = {
    cursor: 'pointer',
    marginTop: '-1rem',
    marginBottom: '-0.5rem',
    fontSize: '0.9rem'
  }

  

  return (
    <div className='single-shoe'>
      <Card >
        <CardMedia
          component="img"
          height="250"
          image={binaryImage !== null ? binaryImage : sneaker.image} alt='nike-shoes' 
          style={{objectFit: "contain", marginTop: '-1rem'}}
          />
        <CardContent>
          <h4 style={cursorStyle} onClick={() => {navigate('/home/single-product/'+sneaker._id);}}>{sneaker.name}</h4>
          <h5 style={{marginBottom: 0, fontSize: '0.8rem'}}>Rs {sneaker.price}</h5>
        </CardContent>
      </Card>
    </div>
  );
}


export function ProductsList({homeProducts, searchedProducts}) {

  //state for pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [sneakersPerPage] = useState(12);


  let paginationCount;
  let currentSneakers;
  const indexOfLastSneaker = currentPage * sneakersPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;
  //sneakers per page


    if(searchedProducts !== null) {
      paginationCount = Math.ceil(searchedProducts.length/sneakersPerPage);
      currentSneakers = searchedProducts.slice(indexOfFirstSneaker, indexOfLastSneaker)
      
    } else {
      paginationCount = Math.ceil(homeProducts.length/sneakersPerPage);
      currentSneakers = homeProducts.slice(indexOfFirstSneaker, indexOfLastSneaker)  
      
    }
  





  //conditional rendering by checking whether searched products exist
  return (
    <div className='products-list'>
{/* 
    { 
      searchedProducts ? 
     
      searchedProducts.map((sneaker)=> {
    return <SingleProduct key={sneaker._id} sneaker={sneaker} />
  })

       : homeProducts.map((sneaker)=> {
    return <SingleProduct key={sneaker._id} sneaker={sneaker} />
  })

  
  } */}

  { 
   
   currentSneakers ?  
    currentSneakers.map((sneaker)=> {
    return <SingleProduct key={sneaker._id} sneaker={sneaker} />
  })
   : <h1>Loading...</h1>
  
  }


<Pagination count= {paginationCount} onChange={(event, value) => {setCurrentPage(value)}} />
    </div>
  );
}
