import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BASE_API_URL } from "./actionCreators";
import UpdatePasswordModal from "./UpdatePasswordModal";

const ProfileForm = ({ userId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    async function fetchUserInformation() {
      let result = await axios.get(`${BASE_API_URL}/users/${userId}`);
      setFormData({ ...formData, ...result.data, firstName: result.data.first_name, lastName: result.data.last_name });
    }
    fetchUserInformation();
  }, []);

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
      <UpdatePasswordModal show={show} handleClose={handleClose} handleShow={handleShow} />
      <form className="m-5" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-xs-12 col-sm-3">
            <label className="sr-only" htmlFor="firstname">
              Username
            </label>
            <input
              onChange={handleChange}
              value={formData.username}
              type="text"
              name="username"
              className="form-control mb-4"
              id="username"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-xs-12 col-sm-3">
            <label className="sr-only" htmlFor="firstname">
              First Name
            </label>
            <input
              onChange={handleChange}
              value={formData.firstName}
              type="text"
              name="firstName"
              className="form-control mb-4"
              id="firstname"
              placeholder="First Name"
            />
          </div>
          <div className="col-xs-12 col-sm-3">
            <label className="sr-only" htmlFor="lastname">
              Last Name
            </label>
            <input
              onChange={handleChange}
              value={formData.lastName}
              type="text"
              name="lastName"
              className="form-control mb-4"
              id="lastname"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="form-row ">
          <div className="col-xs-12 col-sm-6">
            <label className="sr-only" htmlFor="email">
              email
            </label>
            <input
              onChange={handleChange}
              value={formData.email}
              type="text"
              name="email"
              className="form-control mb-4"
              id="email"
              placeholder="example@email.com"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col mb-4">
            <Button variant="secondary" onClick={handleShow}>
              Change Password
            </Button>
          </div>
        </div>
        <div className="form-row">
          <div className="col">
            <button type="submit" className="btn btn-primary mb-4">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
