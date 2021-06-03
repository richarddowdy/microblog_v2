import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Routes from "./Routes";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { decode } from "jsonwebtoken";
import { getCurrentUserFromApi, logoutUser } from "./actionCreators";
import "react-toastify/dist/ReactToastify.min.css";

export let tokenDefault = "help";

let token = localStorage.getItem("_token");
function App() {
  const dispatch = useDispatch();
  const store = useSelector((st) => st);
  let currentUser = useSelector((st) => st.user);

  useEffect(() => {
    async function getCurrentUser() {
      // console.log("entire store", store);
      try {
        dispatch(getCurrentUserFromApi(token)); //TODO
        // console.log(tokenUser);
        // dispatch(currentUser({...tokenUser, is_admin})); // TODO someday maybe?
      } catch (err) {
        console.error("no token");
        dispatch(logoutUser());
      }
    }
    if (!currentUser.username) {
      // console.log("fetching current user");
      getCurrentUser();
    }
    // console.log("theres a user", currentUser);
  }, [token]);

  return (
    <>
      <Navbar />
      <Routes />
      <ToastContainer position="top-center" autoClose={4000} />
    </>
  );
}

export default App;
