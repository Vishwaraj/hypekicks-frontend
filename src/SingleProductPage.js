import { useParams } from "react-router-dom";
import { ProductBody } from './ProductBody';
import { RelatedProducts } from './RelatedProducts';
import { useEffect, useState } from 'react';
import { API } from './global';

export function SingleProductPage() {

  const [singleProduct, setSingleProduct] = useState({});

  const { productID } = useParams();

  console.log(productID);

  const getSingleProduct = () => {
    fetch(`${API}/home/single-product/${productID}`)
      .then(result => result.json())
      .then(data => { console.log(data); setSingleProduct(data.result); });
  };

  const [relatedProducts, setRelatedProduct] = useState([]);

  const getRelatedProduct = () => {
    fetch(`${API}/home/single-product/${productID}`)
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
