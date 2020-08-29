import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Routes from './Routes';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import useLocalStorage from './hooks/useLocalStorage';
import { decode } from "jsonwebtoken";
import { getCurrentUserFromApi } from './actionCreators';
import { currentUser } from './actions/userActions';
export let tokenDefault = "help";

let token = localStorage.getItem("_token");
function App() {
  
  // const [ token, setToken ] = useLocalStorage(tokenDefault);
  const dispatch = useDispatch();
  const store = useSelector((st) => st);
  let currentUser = useSelector((st) => st.user);
  // console.log("currentUser", currentUser);
  // console.log("entire store", store);
  
  // let currentUser;
  // console.log(token);
  useEffect(() => {
    console.log("effect Running")
    async function getCurrentUser() {
      // console.log("entire store", store);
      try {
        // let tokenInfo = decode(token);
        let { is_admin, username } = decode(token);
        // console.log("current User", username);// TODO: complete persistance of current user
        // console.log("entire token", tokenInfo);// TODO: complete persistance of current user
        dispatch(getCurrentUserFromApi(username));//TODO
        // console.log(tokenUser);
        // dispatch(currentUser({...tokenUser, is_admin}));
      } catch (err) {
        console.log("no token")
        // dispatch(removeCurrentUser());
      }
    //   dispatch(loadComplete(true));
    }
    // dispatch(loadComplete(false));
    if(!currentUser.username){
      console.log("fetching current user");
      getCurrentUser();
      // dispatch(currentUser({}))
    }
    // getCurrentUser();
    // console.log("theres a user", currentUser);
  }, [token]);

  return (
    <>
      <Navbar />
      <Routes />
    </>
  );
}

export default App;
