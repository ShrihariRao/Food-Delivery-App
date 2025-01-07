import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar({ search, setSearch }) {

  const [cartView, setcartView] = useState(false)

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // localStorage.removeItem("userEmail");
    navigate("/login")
  }
  
  let data = useCart()

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold"
            to="#"
            style={{ fontSize: "24px", color: "white", fontStyle: "italic" }}
          >
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success mx-1 nav-link fw-bold"
                  to="/Login"
                >
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1 nav-link fw-bold"
                  to="/Createuser"
                >
                  Signup
                </Link>
              </div>
            ) : 
            
            <div>

              <div className="btn bg-white text-success mx-2" onClick={() => {setcartView(true)}}>
                My Cart {"  "}
                <Badge pill bg="danger"> {data.length} </Badge>
              </div>
              
              {cartView ? <Modal onClose={() => setcartView(false)}><Cart /></Modal>: null}

              <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
            
            </div>
                        
            }

            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Use the setSearch prop
              />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
