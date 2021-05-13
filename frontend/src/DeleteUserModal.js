import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { BASE_API_URL, logoutUser } from "./actionCreators";

const DeleteUserModal = ({ show, handleClose, userId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector((st) => st.user.username);
  const initialState = {
    password: "",
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

  const handleDelete = async (evt) => {
    evt.preventDefault();
    if (!formData.password) {
      toast.error("Password required to delete user.");
      return;
    }
    try {
      const data = { userId, username, password: formData.password };
      const result = await axios.delete(`${BASE_API_URL}/users/${username}`, { data });
      toast.success("User deleted successfully");
      handleClose();
      dispatch(logoutUser());
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete your account?</p>
        <Form className="m-4" onSubmit={handleDelete}>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.password}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button className="mr-4" type="submit" variant="danger">
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteUserModal;
