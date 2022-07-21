import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";


export function SideBar() {

  const textColor = {
    color: 'white',
    fontSize: '1.5rem'
  };

  return (

    <div className="sidebar">
      <div className="sidebar-buttons">

        <Button style={textColor} variant="text" color='inherit'>New Releases</Button>
        <Button style={textColor} variant="text" color='inherit'>Popular</Button>
        <Button style={textColor} variant="text" color='inherit'>Trending</Button>

      </div>
    </div>
  );
}
export function SearchBar() {

  const searchBar = {
    width: '30vw',
  };

  return (
    <div>
      <form className='search-bar'>
        <TextField style={searchBar} id="outlined-basic" variant="outlined" />

        <Button variant="outlined" color='inherit'>Search</Button>
      </form>
    </div>
  );
}
function SingleProduct() {

  const navigate = useNavigate();

  const cursorStyle = {
    cursor: 'pointer'
  }

  return (
    <div className='single-shoe'>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image='https://superkicks.in/wp-content/uploads/2022/04/2-100-850x816.jpg' alt='nike-shoes' />
        <CardContent>
          <h4 style={cursorStyle} onClick={() => navigate('/home/single-product')}>NIKE Air More Tempo '96 Iron Grey</h4>
          <h5>₹15,995</h5>
        </CardContent>
      </Card>
    </div>
  );
}
export function ProductsList() {
  return (
    <div className='products-list'>
      <SingleProduct />
      <SingleProduct />
      <SingleProduct />
      <SingleProduct />
      <SingleProduct />
      <SingleProduct />
    </div>
  );
}
