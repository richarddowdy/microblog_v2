import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const UpdatePasswordModal = ({ show, handleClose, handleShow }) => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="m-auto">
            <div className="form-group row">
              <div className="col-xs-12 ">
                <label className="" htmlFor="currentPassword">
                  Current Password:
                </label>
                <input
                // onChange={handleChange}
                // value={formData.currentPassword}
                // type="password"
                // name="currentPassword"
                // className="form-control mb-4"
                // id="currentPassword"
                // placeholder="currentPassword"
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-xs-12 ">
                <label className="" htmlFor="newPassword">
                  New Password:
                </label>
                <input
                // onChange={handleChange}
                // value={formData.newPassword}
                // type="password"
                // name="newPassword"
                // className="form-control mb-4"
                // id="newPassword"
                // placeholder="newPassword"
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-xs-12 ">
                <label className="" htmlFor="repeat">
                  Repeat New Password:
                </label>
                <input
                // onChange={handleChange}
                // value={formData.repeat}
                // type="password"
                // name="repeat"
                // className="form-control mb-4"
                // id="repeat"
                // placeholder="repeat"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatePasswordModal;
