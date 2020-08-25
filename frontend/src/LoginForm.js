import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoginToApi } from './actionCreators'
// import { authenticate } from "../../backend/models/usersModel";

function LoginForm({ login, signUp}) {
  const dispatch = useDispatch();
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(userLoginToApi(formData));
    console.log("clicked login");
  };

  return (
    <>
      <form
        className="col-lg-4 col-md-6 col-8 mt-3 mx-auto"
        onSubmit={handleSubmit}
      >
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
