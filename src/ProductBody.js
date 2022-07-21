import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";


export function ProductBody() {

  const shoeSizeSelect = {
    width: '8vw',
    marginLeft: '1rem',
    height: '5vh',
    marginBottom: '2rem',
  };

  const navigate = useNavigate();

  return (
    <div className="product-body">
      <img className="single-product-image" src="https://superkicks.in/wp-content/uploads/2022/04/1-2-44-850x816.jpg" alt="" />

      <div className="single-information">
        <h2>NIKE Air More Tempo '96 Iron Grey</h2>
        <h3>₹15,995</h3>
        <p> The Nike Air More Uptempo ’96 brings classic basketball back to the streets.
          A collage of the beloved Swoosh logo alongside visible Max Air cushioning equates to an of-era.
          Chunky design for a look that will never fade.

          Elastic straps over the tongue keep your style sharp, whether you rock them laced or unlaced.
          Originally designed for performance hoops, the Max Air units add lightweight, durable cushioning.
          Synthetic leather underlays add dimension beneath the iconic “AIR” lettering.
          Round laces match the 2 round pull tabs for added style points while making it easy to lace up and take on and off.</p>
        <div className="shoe-size">

          <InputLabel>Shoe Size (UK)</InputLabel>
          <Select
            labelId="test-select-label"
            label="Shoe Size"
            style={shoeSizeSelect}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={7}>7</MenuItem>
          </Select>
        </div>
        <Button variant="outlined" color='inherit' onClick={() => navigate('/cart')}>Add to Cart</Button>
      </div>
    </div>
  );
}
