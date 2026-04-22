import React from "react";
import {  useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Account.css";

function Account() {

   const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    navigate("/login");

    window.location.reload();

  };

  return (

    <div>

      <Navbar />

      <div className="account-container">

        <h2 className="account-title">

          My Account 👤

        </h2>

        {user ? (

          <div className="account-card">

            {/* Avatar */}

            <div className="avatar">

              {user.name
                ?.charAt(0)
                .toUpperCase()}

            </div>

            {/* USER DETAILS */}

            <div className="account-info">

              <div className="info-row">

                <span className="label">
                  Name
                </span>

                <span className="value">
                  {user.name || "Not Added"}
                </span>

              </div>

              <div className="info-row">

                <span className="label">
                  Email
                </span>

                <span className="value">
                  {user.email || "Not Added"}
                </span>

              </div>

              {/* EXTRA DETAILS */}

              <div className="info-row">

                <span className="label">
                  Phone
                </span>

                <span className="value">
                  {user.phone || "Not Added"}
                </span>

              </div>

              <div className="info-row">

                <span className="label">
                  Address
                </span>

                <span className="value">
                  {user.address || "Not Added"}
                </span>

              </div>

              <div className="info-row">

                <span className="label">
                  City
                </span>

                <span className="value">
                  {user.city || "Not Added"}
                </span>

              </div>

              <div className="info-row">

                <span className="label">
                  State
                </span>

                <span className="value">
                  {user.state || "Not Added"}
                </span>

              </div>

              <div className="info-row">

                <span className="label">
                  Pincode
                </span>

                <span className="value">
                  {user.pincode || "Not Added"}
                </span>

              </div>

              <div className="info-row">

                <span className="label">
                  Joined
                </span>

                <span className="value">
                  {user.joined || "Recently"}
                </span>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="account-actions">

              <button className="edit-btn">

                Edit Profile

              </button>

              <button className="password-btn">

                Change Password

              </button>

              <button
                onClick={handleLogout}
                className="logout-btn"
              >

                Logout

              </button>

            </div>

          </div>

        ) : (

          <p className="no-user">

            No user logged in

          </p>

        )}

      </div>

    </div>

  );

}

export default Account;