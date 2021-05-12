import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { BASE_API_URL } from "./actionCreators";

const UpdatePasswordModal = ({ show, handleClose, userId }) => {
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (formData.newPassword !== formData.repeatNewPassword) {
      toast.error("The new passwords do not match each other.");
      return;
    }
    try{
      const result = await axios.patch(`${BASE_API_URL}/users/${userId}/updatePassword`, formData);
      toast.success("Password updated successfully.");
    } catch (err) {
      toast.error("Password not updated.");
    } finally {
      // console.log(formData);
      setFormData(initialState);
    }
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
