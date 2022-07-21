export function OrderList() {
  return (
    <div className='order-list'>
      <OrderBody />
    </div>
  );
}
function OrderBody() {
  return (
    <div className='order-body'>
      <ProductOrder />
      <ProfileOrderShipping />
    </div>
  );
}
function ProductOrder() {
  return (
    <div className="product-order">
      <img src="https://superkicks.in/wp-content/uploads/2022/04/1-2-44-850x816.jpg" alt="" />
      <div className="product-order-info">
        <h3>NIKE Air More Tempo '96 Iron Grey</h3>
        <h4>Size: 9</h4>
        <h4>Quantity: 1</h4>
        <h4>₹15,995</h4>
      </div>
    </div>
  );
}
function ProfileOrderShipping() {
  return (
    <div className="shipping-info">
      <h3>Shipping to :</h3>
      <h3>Vishwaraj Kamble</h3>
      <h3>Address : Default Address</h3>
      <h3>Arriving in : 4 days</h3>
    </div>
  );
}
