import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export function RelatedProducts() {
  return (
    <div className='related-single-product'>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image='https://superkicks.in/wp-content/uploads/2022/04/2-97-850x816.jpg' alt='nike-shoes' />
        <CardContent>
          <h4>Nike Blazer Low Platform Next Nature Pale Ivory / Bourder Blue</h4>
          <h5>₹9,195</h5>
        </CardContent>
      </Card>
    </div>
  );
}
