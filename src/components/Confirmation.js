import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const Confirmation = ({ show, title, message, onConfirm, onCancel, isSubmitting  }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="danger" onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? (
                <Spinner animation="border" size="sm" />
            ) : (
                <span>Confirm</span>
            )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmation;
