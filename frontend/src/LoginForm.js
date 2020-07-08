import React, { useState } from "react";

function LoginForm({ login, signUp}) {
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
    console.log(formData);
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
