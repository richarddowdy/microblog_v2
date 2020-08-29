import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

function NavBar() {
  
  const user = useSelector((st) => st.user);
  
  // useEffect(() => {
    
  // }, [user])
  
  // console.log("Navbar", user);
  return (
    <div style={{height: "200px"}} className="navbar text-dark">
      <NavLink to="/" className=" app-brand text-dark">Microblog</NavLink>
      <a href="https://github.com/richarddowdy/microblog_v2" target="_blank" rel="noopener noreferrer" className="text-dark text-center"><i className="fab fa-github fa-3x"></i><span className="d-block">Github Repo</span></a>
      <div style={{display: "block"}} className="text-light col-12">
        <NavLink to="/" className="mr-4 font-weight-bold navbar-link">Blog</NavLink>
        <NavLink to="/new" className="font-weight-bold navbar-link">Add a new post</NavLink>
      </div>
    </div>
  );
}

export default NavBar;

