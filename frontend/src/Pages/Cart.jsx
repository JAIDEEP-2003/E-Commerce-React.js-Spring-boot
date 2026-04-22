import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch cart from database
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user) return;

        const response = await axios.get(
          `http://localhost:8080/api/cart/details/${user.id}`,
        );

        setCartItems(response.data);
      } catch (error) {
        console.error("Fetch Cart Error:", error);
      }
    };

    fetchCart();
  }, [user]);

  // Remove item
  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${id}`);

      // Refresh cart
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Increase quantity
  const increaseQty = async (item) => {
    try {
      const updatedItem = {
        id: item.id,
        userId: item.userId,
        title: item.title,
        price: item.price,
        quantity: item.quantity + 1,
      };

      await axios.post("http://localhost:8080/api/cart", updatedItem);

      refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  // Decrease quantity
  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;

    try {
      const updatedItem = {
        id: item.id,
        userId: item.userId,
        title: item.title,
        price: item.price,
        quantity: item.quantity - 1,
      };

      await axios.post("http://localhost:8080/api/cart", updatedItem);

      refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  // Refresh Cart
  const refreshCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cart/details/${user.id}`,
      );

      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Place Order
  const placeOrder = async () => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      for (let item of cartItems) {
        const orderData = {
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          userId: user.id,

          // ✅ ADD THIS LINE
          email: user.email,
        };

        await axios.post("http://localhost:8080/api/orders", orderData);

        // Delete from cart
        await axios.delete(`http://localhost:8080/api/cart/${item.id}`);
      }

      setCartItems([]);

      alert("Order Placed Successfully 📦");
    } catch (error) {
      console.error(error);

      alert("Failed to place order");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Cart 🛒</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <h3>{item.title}</h3>

                <p>₹ {item.price}</p>

                <p>
                  Quantity:
                  <button onClick={() => decreaseQty(item)}>-</button>
                  {item.quantity}
                  <button onClick={() => increaseQty(item)}>+</button>
                </p>

                <button onClick={() => removeItem(item.id)}>Remove ❌</button>
              </div>
            ))}

            <h3>Total: ₹ {totalPrice}</h3>

            <button
              onClick={placeOrder}
              style={{
                marginTop: "15px",
                padding: "10px",
              }}
            >
              Place Order 📦
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
