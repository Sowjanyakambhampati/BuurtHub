import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

function AllProductsPage() {
  const { city } = useParams([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5005/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>

      <div>
        <h2>Product Listing</h2>

        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id}>

                <img
                  className="tile2"
                  src="https://res.cloudinary.com/dvlqkjs7x/image/upload/v1718306669/movie-gallery/fbojq2kup37cu8uicccf.png"
                  alt={product.productName}
                />
                <p>{product.productName}</p>
                <p>{product.city}</p>
                <p>{product.price} €</p>
                <p>{product.productOwner}</p>
                <p>{product.category}</p>
                <p>{product.condition}</p>
                <p>{product.description}</p>
              </div>
            ))
          ) : (
            <p>No products found for this city.</p>
          )}
        </div>
      </div>



    </div>
  )
}

export default AllProductsPage
