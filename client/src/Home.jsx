import { useEffect, useState } from "react";
import { BACKEND_URI } from "./config";
import axios from "axios";
const Home = () => {
  let Categories = [
    "Laptops",
    "Smartphones",
    "Cameras",
    "Tablets",
    "Audio Devices",
    "Gaming Consoles",
    "Wearables",
    "Accessories",
    "Home Appliances",
    "Other",
  ];
  let [brands,setBrands] = useState([
    "Apple",
    "Samsung",
    "Sony",
    "Dell",
    "HP",
    "Lenovo",
    "LG",
    "Canon",
    "Nikon",
    "Bose",
    "Microsoft",
    "Asus",
    "Logitech",
    "Google",
    "Fitbit",
    "Xiaomi",
    "Sony",
    "Panasonic",
    "JBL",
    "Philips",
  ]);
  let [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      axios.get(`${BACKEND_URI}/products`).then(({ data }) => {
        let { products } = data;
        products = new Array(4).fill(products.flat());
        setProducts(products.flat());
      });
    };
    getProducts();
  }, []);


  function filterBrand(brand){
    products.map(p=>(p.brand===brand))
    setProducts(brand)
  }



  return (
    <>
      <div className="flex">
        <div className="w-[12.6%] text-xl   fixed">
          <h1 className="text-sky-500 font-bold text-2xl"> Categories</h1>
          <ul className="text-lg">
            {Categories.map((cat, i) => (
              <li  key={i} className="hover:cursor-pointer mt-2">{cat}</li>
            ))}
          </ul>
          <div className="">
            {brands.map((b, i) => (
              <button onClick={()=>(filterBrand(b))} className="border p-2 text-sm  " key={i}>
                {b}
              </button>
            ))}
          </div>
        </div>
        {/* product section  */}
        <div className="grid w-[85%]  ms-auto  grid-cols-4 gap-2">
          {products.map(({ name, price, condition,picture }, i) => (
            <div className="border rounded-xl p-2" key={i}>
              <img
              src={picture[0]!==undefined?picture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFBd7ZcEsm4ao2JLmpjdPbPVhCVbYw4Nl98n67Exa3hw&s"}              
                alt=""
              />
              {name} <br />${price} <br />
              {condition} <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
