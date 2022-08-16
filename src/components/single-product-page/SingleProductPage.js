import { useParams } from "react-router-dom";
import { ProductBody } from './ProductBody';
import { RelatedProducts } from './RelatedProducts';
import { useEffect, useState } from 'react';
import { API } from '../../global';

export function SingleProductPage() {

  //setting state for single product
  const [singleProduct, setSingleProduct] = useState({});

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
      .then(data => { console.log(data); setSingleProduct(data.result); });
  };


  //setting state for related products
  const [relatedProducts, setRelatedProduct] = useState([]);

  //function to get related products
  const getRelatedProduct = () => {
    fetch(`${API}/home/single-product/${productID}`, {
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      }
    })
      .then(result => result.json())
      .then(data => { console.log(data.relatedProducts); setRelatedProduct(data.relatedProducts); });
  };

  useEffect(() => {
    getSingleProduct();
    getRelatedProduct();
  }, []);


  return (
    <div>
      <ProductBody singleProduct={singleProduct} />
      <div className='related-products'>
        <h1>Related Products</h1>
        <div className='related-product-cards'>
          {relatedProducts.map((sneaker) => {
            return <RelatedProducts setSingleProduct={setSingleProduct} sneaker={sneaker} />;
          })}
        </div>
      </div>
    </div>
  );
}
