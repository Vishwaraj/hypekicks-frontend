import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useNavigate } from 'react-router-dom';


export function RelatedProducts({sneaker, setSingleProduct}) {

  let binaryImage = null;
  if(sneaker.image.length > 10000) {
    binaryImage = `data:image/jpeg;base64,${sneaker.image}`
  }

  const navigate = useNavigate();

  //styles for cursor
  const cursorStyle = {
    cursor: 'pointer',
    marginTop: 0,
    marginBottom: 0
  }

  return (
    <div className='related-single-product'>
      <Card>
        <CardMedia
          component="img"
          height="250"
          image={binaryImage !== null ? binaryImage :  sneaker.image} alt='nike-shoes' />
        <CardContent>
          <h4 style={cursorStyle} onClick={() => {navigate('/home/single-product/'+sneaker._id); setSingleProduct(sneaker)}}>{sneaker.name}</h4>
          <h5 style={{marginBottom: 0, marginTop: '0.5rem'}}>₹{sneaker.price}</h5>
        </CardContent>
      </Card>
    </div>
  );
}
