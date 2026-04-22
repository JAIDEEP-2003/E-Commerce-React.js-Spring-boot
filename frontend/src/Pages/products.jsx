import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./Products.css";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await axios.get(
          "https://dummyjson.com/products"
        );

        setProducts(response.data.products);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  if (loading) {

    return (
      <>
        <Navbar />
        <h2 style={{ padding: "20px" }}>
          Loading Products...
        </h2>
      </>
    );

  }

  return (

    <div>

      <Navbar />

      <div className="products-container">

        <h2>Product List</h2>

        <div className="product-grid">

          {products.map((product) => (

            <div
              key={product.id}
              className="product-card"
            >

              <img
                src={product.thumbnail}
                alt={product.title}
              />

              <h4>{product.title}</h4>

              <p className="price">
                ₹ {product.price}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Products;