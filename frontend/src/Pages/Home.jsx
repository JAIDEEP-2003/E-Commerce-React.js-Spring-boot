import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [toast, setToast] = useState("");

  const productsPerPage = 20;

  const user = JSON.parse(localStorage.getItem("user"));
  //const cartKey = `cart_${user?.id}`;
  //const wishlistKey = `wishlist_${user?.id}`;

  /* FETCH PRODUCTS */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=1000",
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

  /* FILTER */

  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category,
    );
  }

  /* SORT */

  if (sortOption === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  /* PAGINATION */

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  /* ADD CART */

  const addToCart = async (product) => {

  if (!user) {

    alert("Please login first");
    return;

  }

  try {

    const cartItem = {

      userId: user.id,   // ✅ IMPORTANT
      title: product.title,
      price: product.price,
      quantity: 1

    };

    await axios.post(
      "http://localhost:8080/api/cart",
      cartItem
    );

    showToast("Added to Cart 🛒");

  } catch (error) {

    console.error("Cart Error:", error);

  }

};

  /* TOAST */

  const showToast = (msg) => {
    setToast(msg);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  return (
    <div>
      <Navbar
        onSearch={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
      />

      {/* ===== CONTINUOUS BANNER ===== */}

      <div className="banner-container">
        <div className="banner-track">
          <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db" />
          <img src="https://images.unsplash.com/photo-1586880244406-556ebe35f282" />
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da" />

          {/* Duplicate */}

          <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db" />
          <img src="https://images.unsplash.com/photo-1586880244406-556ebe35f282" />
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da" />
        </div>
      </div>

      {/* FILTER */}

      <div className="filter-bar">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>

          <option value="beauty">Beauty</option>

          <option value="fragrances">Fragrances</option>

          <option value="groceries">Groceries</option>

          <option value="furniture">Furniture</option>
        </select>

        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>

          <option value="low">Price Low → High</option>

          <option value="high">Price High → Low</option>
        </select>
      </div>

      {/* PRODUCTS */}

      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="product-container">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                <span className="discount">
                  {Math.round(product.discountPercentage)}% OFF
                </span>

                <img src={product.thumbnail} alt={product.title} />

                <h3>{product.title}</h3>

                <p className="rating">⭐ {product.rating}</p>

                <p className="stock">
                  {product.stock > 0 ? "In Stock ✅" : "Out of Stock ❌"}
                </p>

                <p className="price">₹ {product.price}</p>

                <button className="cart-btn" onClick={() => addToCart(product)}>
                  Add 🛒
                </button>
              </div>
            ))}
          </div>

          {/* PAGINATION */}

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ===== BOTTOM BANNERS ===== */}

      <div className="bottom-banners">
        <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db" />

        <img src="https://images.unsplash.com/photo-1586880244406-556ebe35f282" />
      </div>

      {/* ===== FEATURES ===== */}

      <div className="features-section">
        <div className="feature">
          🚚
          <h4>Fast Delivery</h4>
          <p>Delivered to your door quickly</p>
        </div>

        <div className="feature">
          💰
          <h4>Best Prices</h4>
          <p>Affordable everyday deals</p>
        </div>

        <div className="feature">
          🔒
          <h4>Secure Payment</h4>
          <p>100% secure transactions</p>
        </div>

        <div className="feature">
          ⭐<h4>Quality Products</h4>
          <p>Trusted premium items</p>
        </div>
      </div>

      {/* ===== ABOUT ===== */}

      <div className="about-store">
        <h2>Welcome to QuickKart 🛒</h2>

        <p>
          QuickKart is your one-stop online shopping destination. We deliver
          groceries and essentials fast and reliably.
        </p>
      </div>

      {/* ===== NEWSLETTER ===== */}

      <div className="newsletter">
        <h3>Subscribe for Latest Offers</h3>

        <div className="newsletter-box">
          <input type="email" placeholder="Enter your email" />

          <button>Subscribe</button>
        </div>
      </div>

      {/* ===== FOOTER ===== */}

      <footer className="footer">
        <div className="footer-content">
          <div>
            <h4>QuickKart</h4>
            <p>Your trusted shopping partner</p>
          </div>

          <div>
            <h4>Company</h4>
            <p>About Us</p>
            <p>Careers</p>
          </div>

          <div>
            <h4>Help</h4>
            <p>Support</p>
            <p>Returns</p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>Email: support@quickkart.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
        </div>

        <div className="copyright">© 2026 QuickKart. All Rights Reserved.</div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Home;
