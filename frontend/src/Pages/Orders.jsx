import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

function Orders() {

  const [orders, setOrders] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("user"));

  // Load orders

  useEffect(() => {

    const loadOrders = async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:8080/api/orders/${user.id}`

          );

        setOrders(response.data);

      }

      catch (error) {

        console.error(error);

      }

    };

    loadOrders();

  }, [user.id]);

  // Delete order

  const removeOrder = async (id) => {

    try {

      await axios.delete(

        `http://localhost:8080/api/orders/${id}`

      );

      // Reload

      const response =
        await axios.get(

          `http://localhost:8080/api/orders/${user.id}`

        );

      setOrders(response.data);

    }

    catch (error) {

      console.error(error);

    }

  };

  return (

    <div>

      <Navbar />

      <div style={{ padding: "20px" }}>

        <h2>Orders 📦</h2>

        {orders.length === 0 ? (

          <p>No Orders Yet</p>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px"
              }}
            >

              <h3>

                {order.title}

              </h3>

              <p>

                ₹ {order.price}

              </p>

              <p>

                Qty: {order.quantity}

              </p>

              <button
                onClick={() =>
                  removeOrder(order.id)
                }
              >

                Remove ❌

              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Orders;