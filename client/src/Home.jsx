import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Home() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("https://techxchange1.onrender.com/products")
      .then(response => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>{JSON.stringify(product)}</div>
  );
}

export default Home;
