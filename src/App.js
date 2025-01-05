import "./App.css";
import React from "react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./screens/Login";
import Signup from "./screens/Signup.js";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from "./components/ContextReducer.js";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Createuser" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
