import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
        <Link to="/" className="logo">
            <span>M</span>
            <span>M</span>
            <span>M</span>
            <span>.</span>
          </Link>
        </div>
        <div className="user-cart">
          <Link to="/home">Home</Link>
          <Link to="/recipes">Przepisy</Link>
          <Link to="/products">Produkty</Link>
          <Link to="/articles">Artykuły</Link>
          <Link to="/user">Profil</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
