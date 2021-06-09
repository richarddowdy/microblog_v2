import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./actionCreators";

function NavBar() {
  const currentUser = useSelector((st) => st.user);
  const dispatch = useDispatch();

  return (
    <nav style={{ height: "220px" }} className="navbar">
      <NavLink to="/" className="app-brand">
        Microblog
      </NavLink>
      <a
        href="https://github.com/richarddowdy/microblog_v2"
        target="_blank"
        rel="noopener noreferrer"
        className="text-center"
        style={{ color: "black" }}
      >
        <i className="fab fa-github fa-3x"></i>
        <span className="d-block">Github Repo</span>
      </a>
      <div style={{ display: "block" }} className="text-light col-12 p-0">
        <NavLink to="/" className="link-margin font-weight-bold navbar-link divider">
          Blog
        </NavLink>
        <NavLink to="/new" className="link-margin font-weight-bold navbar-link divider">
          Add New post
        </NavLink>
        {currentUser.id ? (
          <>
            <NavLink to={`/user/${currentUser.id}`} className="link-margin font-weight-bold navbar-link">
              Profile
            </NavLink>
            <NavLink to="/" className="font-weight-bold navbar-link" onClick={() => dispatch(logoutUser())}>
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className="font-weight-bold navbar-link">
            Login / Sign UP
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
