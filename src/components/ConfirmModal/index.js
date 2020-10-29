import React from "react";
import { Modal, Button, Feather } from "../../components";

const ConfirmModal = ({
  show,
  handleClose,
  msg = "Are you sure?",
  onConfirm,
}) => {
  return (
    <Modal show={show} handleClose={handleClose} maxWidth={500}>
      <div className="modal__content">
        <div className="row justify-content-center mb-5">
          <span style={{fontSize: "15px",textAlign : 'center' }}>{msg}</span>
        </div>
        <div className="row justify-content-center">
          <Button
            customClass="btn--block btn--light mr-20"
            style={{ width: "150px" }}
            onClick={handleClose}
          >
            <strong>Cancel</strong>
          </Button>
          <Button
            customClass="btn--block btn--primary"
            style={{ width: "150px" }}
            type="primary"
            onClick={onConfirm}
          >
            <strong>Confirm</strong>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ConfirmModal;
