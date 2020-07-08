import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function NavBar() {

  return (
    <div style={{height: "200px", backgroundColor: "#d7d7dc" }} className="navbar text-dark">
      <NavLink to="/" className="col-12 app-brand text-dark">Microblog</NavLink>
        <NavLink to="/login" className="col-12 font-weight-bold navbar-link">Login/Sign Up</NavLink>
      <div style={{display: "block"}} className="text-light col-12">
        <NavLink to="/" className="mr-4 font-weight-bold navbar-link">Blog</NavLink>
        <NavLink to="/new" className="font-weight-bold navbar-link">Add a new post</NavLink>
      </div>
    </div>
  );
}

export default NavBar;

