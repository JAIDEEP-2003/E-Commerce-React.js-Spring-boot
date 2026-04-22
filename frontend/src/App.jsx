import { Routes, Route, Navigate }
from "react-router-dom";

import Home from "./Pages/Home";
import Products from "./Pages/products";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Account from "./Pages/Account";

function App() {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  return (

    <Routes>

      {/* Home Routes */}

      <Route
        path="/"
        element={
          isLoggedIn
            ? <Home />
            : <Navigate to="/login" />
        }
      />

      {/* ✅ ADD THIS */}

      <Route
        path="/home"
        element={
          isLoggedIn
            ? <Home />
            : <Navigate to="/Home" />
        }
      />

      <Route
        path="/products"
        element={
          isLoggedIn
            ? <Products />
            : <Navigate to="/products" />
        }
      />

      <Route
        path="/cart"
        element={
          isLoggedIn
            ? <Cart />
            : <Navigate to="/cart" />
        }
      />

      <Route
        path="/orders"
        element={
          isLoggedIn
            ? <Orders />
            : <Navigate to="/orders" />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
  path="/account"
  element={
    isLoggedIn
      ? <Account />
      : <Navigate to="/Account" />
  }
/>

    </Routes>

  );

}

export default App;