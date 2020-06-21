import React from 'react';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function NavBar() {

  return (
    <div style={{height: "200px", backgroundColor: "#d2d2dc" }} className="navbar text-dark">
      <h1 style={{display: "block", fontSize: "70px"}} className="col-12">Microblog</h1>
      <h3 className="col-12">Share your post!</h3>
      <div style={{display: "block"}} className="text-light col-12">
        <NavLink to="/" className="mr-4 font-weight-bold">Blog</NavLink>
        <NavLink to="/new" className="font-weight-bold">Add a new post</NavLink>
      </div>
    </div>
  );
}

export default NavBar;

