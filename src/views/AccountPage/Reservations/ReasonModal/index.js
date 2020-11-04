import React, { useState } from "react";
import { TextArea, Modal, Button } from "../../../../components";

const ReasonModal = ({ show, handleClose, onConfirm }) => {
  const [reason, set_reason] = useState("");
  return (
    <Modal show={show} handleClose={handleClose} maxWidth={500}>
      <div className="modal__title">Cancel reservation</div>
      <div className="modal__content">
        <div className="row justify-content-center mb-5">
          <span style={{ fontSize: "15px", textAlign: "center" }}>
            An email will be sent to your client informing them that their
            reservation has been canceled. Please fill the reason below
          </span>
        </div>
        <TextArea
          defaultValue={reason}
          onChange={(e) => set_reason(e.target.value)}
        />
        <div
          className="row justify-content-center"
          style={{ marginTop: "20px" }}
        >
          <Button
            customClass="btn--block btn--primary"
            style={{ width: "150px" }}
            type="primary"
            onClick={() => onConfirm(reason)}
          >
            <strong>Save</strong>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ReasonModal;
