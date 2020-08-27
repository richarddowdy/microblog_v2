import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Routes from './Routes';
import './App.css';
import { useSelector } from 'react-redux';
import useLocalStorage from './hooks/useLocalStorage';
import { decode } from "jsonwebtoken";

export let tokenDefault = "help";

function App() {
  
  const store = useSelector((st) => st);
  const [ token, setToken ] = useLocalStorage(tokenDefault);

  useEffect(() => {
    let token = localStorage.getItem("_token");

    async function getCurrentUser() {
      console.log("entire store", store);
      try {
        let { username } = decode(token);
        console.log(username);// TODO: complete persistance of current user
        // let currentUser = await getUser();//TODO
        // dispatch(getCurrentUser(currentUser));
      } catch (err) {
        // dispatch(removeCurrentUser());
      }
    //   dispatch(loadComplete(true));
    }
    // dispatch(loadComplete(false));
    getCurrentUser();
  }, [token]);

  return (
    <>
      <Navbar />
      <Routes />
    </>
  );
}

export default App;
