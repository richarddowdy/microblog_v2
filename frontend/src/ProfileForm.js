import React, { useEffect, useState } from "react";

const ProfileForm = () => {
  useEffect(() => {}, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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

  console.log(formData);
  return (
    <form className="m-5">
      <div class="form-row align-items-center">
        <div class="col-xs-12 col-sm-3">
          <label class="sr-only" for="firstname">
            First Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="firstName"
            class="form-control mb-4"
            id="firstname"
            placeholder="First Name"
          />
        </div>
        <div class="col-xs-12 col-sm-3">
          <label class="sr-only" for="lastname">
            Last Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="lastName"
            class="form-control mb-4"
            id="lastname"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div class="form-row align-items-center">
        <div class="col-xs-12 col-sm-6">
          <label class="sr-only" for="email">
            email
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            class="form-control mb-4"
            id="email"
            placeholder="example@email.com"
          />
        </div>
      </div>
      <div class="form-row align-items-center">
        <div class="col-xs-12 col-sm-3">
          <label class="sr-only" for="firstname">
            Username
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="username"
            class="form-control mb-4"
            id="username"
            placeholder="Username"
          />
        </div>
        <div class="col-xs-12 col-sm-3">
          <label class="sr-only" for="lastname">
            Password
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            class="form-control mb-4"
            id="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div class="form-row align-items-center">
        <div class="col">
          <button type="submit" class="btn btn-primary mb-4">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
