import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BASE_API_URL } from "./actionCreators";
import { Form, Col } from "react-bootstrap";
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
              // id="firstname"
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
              // id="lastname"
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
              // id="username"
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
              // id="email"
              placeholder="example@email.com"
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ProfileForm;
