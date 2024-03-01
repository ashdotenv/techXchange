import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Home() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("https://techxchange1.onrender.com/products")
      .then(response => {
        setProduct(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <>
  <div className='flex'>
    <div>
      Categories <br /><ul>
        {[...new Set(product.map((pr,i) =><li key={i}>{pr.category}</li> ))]}
      </ul>
    </div>
    <div>
    {product.map((p,i)=>(
      <div key={i}>
        {p.name}
        {p.price}
      </div>
    ))}
    </div>
  </div>
    </>
  );
}

export default Home;
