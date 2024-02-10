import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios
      .get("https://techxchange1.onrender.com/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="grid grid-rows-4 grid-cols-4  gap-4">
      {products?products.map((data, i) => (

        <div key={i} className="p-4  border-2 border-black text-black shadow-xl rounded-2xl card">
          <img src={data.picture?"":"data:image/png;base64,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"} alt="" className="h-40 object-cover" />
          <h1 className="text-xl font-bold mb-2">{data.name}</h1>
          <p className="text-gray-700 mb-2">{data.description}</p>
          <p className="text-lg font-semibold mb-2">Price : ${data.price}</p>
          <p className="text-lg font-semibold mb-2">Stock : {data.quantity}</p>
          <p className="text-lg font-semibold mb-2">Location : {data.location}</p>
        </div>
      )):"Loading...."}
    </div>
  );
}

export default Home;
