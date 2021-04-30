import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdatePasswordModal = ({ show, handleClose, handleShow }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const initialState = {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const [formData, setFormData] = useState(initialState);

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
    setFormData(initialState);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="m-4" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="password">Current Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.currentPassword}
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="Current Password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="newPassword">New Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.newPassword}
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="New Password"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="repeatNewPassword">Confirm New Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.repeatNewPassword}
              type="password"
              name="repeatNewPassword"
              id="repeatNewPassword"
              placeholder="Confirm New Password"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePasswordModal;
