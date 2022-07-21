import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export function CartProductList() {
  return (
    <div className="cart-product-list">
      <CartProductSingle />
      <CartProductSingle />
      <CartProductSingle />
    </div>
  );
}
function CartProductSingle() {

  const cartShoeInput = {
    width: '5vw',
  };

  const min = 0;
  const max = 10;

  return (
    <div className="cart-product">
      <IconButton>
        <CloseIcon />
      </IconButton>
      <img src="https://superkicks.in/wp-content/uploads/2022/04/1-2-44-850x816.jpg" alt="" />
      <h2>NIKE Air More Tempo '96 Iron Grey</h2>
      {/* <input type="number" min-value="1" value="1"/> */}
      <TextField inputProps={{ min, max }} style={cartShoeInput} type='number' />
      <h3>₹15,995</h3>
    </div>
  );
}
