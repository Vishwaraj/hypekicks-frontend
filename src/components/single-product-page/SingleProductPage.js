import { useParams } from "react-router-dom";
import { ProductBody } from './ProductBody';
import { RelatedProducts } from './RelatedProducts';
import { useEffect, useRef, useState } from 'react';
import { API } from '../../global';

export function SingleProductPage() {

  //setting state for single product and related products
  const [singleProduct, setSingleProduct] = useState({});
  const [relatedProducts, setRelatedProduct] = useState([]);

  //getting product ID from url params
  const { productID } = useParams();

  //getting token
  const token = window.localStorage.getItem('token');


  //function to get single product info
  const getSingleProduct = () => {
    fetch(`${API}/home/single-product/${productID}`, {
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      }
    })
      .then(result => result.json())
      .then(data => { console.log(data); setSingleProduct(data.result); setRelatedProduct(data.relatedProducts)});
  };

  useEffect(() => {
    getSingleProduct();
  }, []);





  return (
    <div>
      <ProductBody singleProduct={singleProduct} />
      <div className='related-products'>
        <h1>Related Products</h1>
        <div className='related-product-cards'>
          {relatedProducts.map((sneaker) => {
            return <RelatedProducts key={sneaker._id} setSingleProduct={setSingleProduct} sneaker={sneaker} />;
          })}
        </div>
      </div>
    </div>
  );
}
