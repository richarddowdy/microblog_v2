import React from 'react';
// import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function NavBar() {

  return (
    <div className="navbar text-light bg-dark">
      <h1 style={{float:'left'}}>Microblog</h1>
      <div style={{float: 'right'}} className="text-light">
        <NavLink to="/" style={{marginRight: '15px'}}>Blog</NavLink>
        <NavLink to="/new">Add a new post</NavLink>
      </div>
    </div>
  );
}

export default NavBar;

