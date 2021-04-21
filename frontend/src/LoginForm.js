import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_API_URL, userLoginToApi, userSignUpToApi } from "./actionCreators";
// import { authenticate } from "../../backend/models/usersModel";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { decode } from "jsonwebtoken";
import { loginUser } from "./actions/userActions";
import { authError } from "./actions/errorActions";

function LoginForm({ login, signUp }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const errorMessage = useSelector((st) => st.errors.loginError);
  // console.log(errorMessage)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("clicked login/signup");
    let authType = signUp ? "users" : "login";
    try {
      dispatch(authError(""));
      let res = await Axios.post(`${BASE_API_URL}/${authType}`, formData);
      console.log("NEW LOGIN RESPONSE", res);
      const token = res.data.token;
      const user = decode(token);
      localStorage.setItem("_token", token);
      dispatch(loginUser(user));
      history.push("/"); // TODO: On successful login
    } catch (err) {
      dispatch(authError(err.response.data.message));
    }
  };

  return (
    <>
      {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}
      <form className="col-lg-4 col-md-6 col-8 mt-3 mx-auto" onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          className="form-control"
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-dark mt-3">Submit</button>
      </form>
    </>
  );
}

export default LoginForm;
