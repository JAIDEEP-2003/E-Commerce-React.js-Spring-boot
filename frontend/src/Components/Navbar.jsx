import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onSearch }) {

  const navigate = useNavigate();

  const [userName] = useState(() => {

    const storedUser =
      JSON.parse(localStorage.getItem("user"));

    return storedUser ? storedUser.name : "";

  });

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");

    window.location.reload();

  };

  return (

    <div className="navbar-wrapper">

      {/* TOP NAVBAR */}

      <div className="navbar-top">

        {/* LOGO */}

        <div className="logo">

          <Link to="/home">

            <span className="logo-icon">
              Q
            </span>

            <span className="logo-text">
              QuickKart
            </span>

          </Link>

        </div>

        {/* SEARCH */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Search for products..."
            onChange={(e) =>
              onSearch(e.target.value)
            }
          />

        </div>

        {/* RIGHT SIDE */}

        <div className="nav-right">

          {/* DELIVERY */}

          <div className="delivery-box">

            🚚 Delivery in 10 mins

          </div>

          {/* USER SECTION */}

          {userName ? (

            <div className="user-section">

              <span className="user-name">

                👋 Welcome, {userName}

              </span>

              <button
                onClick={handleLogout}
                className="logout-btn"
              >

                Logout

              </button>

            </div>

          ) : (

            <Link to="/login" className="login-link">

              Login / Sign Up

            </Link>

          )}

          {/* CART */}

          <Link
            to="/cart"
            className="cart-icon"
          >

            🛒

          </Link>

        </div>

      </div>

      {/* BOTTOM NAV */}

      <div className="navbar-bottom">

        <Link to="/home" className="nav-link">
          Home
        </Link>

        <Link to="/cart" className="nav-link">
          Cart
        </Link>

        <Link to="/orders" className="nav-link">
          Orders
        </Link>

        <Link to="/account" className="nav-link">
          Account
        </Link>

      </div>

    </div>

  );

}

export default Navbar;