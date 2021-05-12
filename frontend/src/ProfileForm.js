import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BASE_API_URL } from "./actionCreators";
import { Form, Col } from "react-bootstrap";
import UpdatePasswordModal from "./UpdatePasswordModal";
import { toast } from "react-toastify";

const ProfileForm = ({ userId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    async function fetchUserInformation() {
      let result = await axios.get(`${BASE_API_URL}/users/${userId}`);
      const { username, first_name, last_name, email } = result.data;
      // console.log(result.data);
      setFormData({ userId, username, email, firstName: first_name, lastName: last_name });
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
    // console.log(formData);
    async function updateUserData(formData) {
      try {
        const result = await axios.patch(`${BASE_API_URL}/users/${userId}`, formData);
        toast.success("User data updated successfully.");
      } catch (err) {
        toast.error("Unable to update user info.");
      }
    }
    updateUserData(formData);
  };

  return (
    <>
      <UpdatePasswordModal show={show} handleClose={handleClose} handleShow={handleShow} userId={userId} />
      <Form className="p-5" onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName" xs={12} md={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.firstName}
              type="text"
              name="firstName"
              className="form-control mb-4"
              placeholder="First Name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName" xs={12} md={6}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.lastName}
              type="text"
              name="lastName"
              className="form-control mb-4"
              placeholder="Last Name"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUsername" xs={12} md={4}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.username}
              type="text"
              name="username"
              className="form-control mb-4"
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail" xs={12} md={8}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.email}
              type="text"
              name="email"
              className="form-control mb-4"
              placeholder="example@email.com"
            />
          </Form.Group>
        </Form.Row>
        <Button className="d-block mb-4" variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="secondary" onClick={handleShow}>
          Change Password
        </Button>
      </Form>
    </>
  );
};

export default ProfileForm;
