import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addPaymentMethod } from "../services/services";
import { toastAlert } from "../utils/SweetAlert";
import Loader from "../utils/Loader";

const AddCard = ({ show, handleClose }) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const mutation = useMutation({
    mutationFn: (body) => addPaymentMethod(body),
    onSuccess: (resp) => {
      toastAlert("success", resp?.data?.message);
      elements.getElement(CardElement).clear();
      handleClose();
    },
  });

  const addCard = async () => {
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);

    const card = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(card);
    setPaymentLoading(false);
    if (error) {
      console.error(error);
    } else {
      if (token) {
        let body = {
          cardTokenId: token?.id,
        };
        mutation.mutate(body);
      }
    }
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton className="border-0 px-4">
        <h5>Card</h5>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Form>
          <CardElement />
          <div className="text-center my-4 ">
            <Button
              className="btn-theme"
              type="button"
              disabled={isPaymentLoading}
              onClick={addCard}
            >
              {isPaymentLoading ? "Loading..." : "Add"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      {mutation?.isPending && <Loader />}
    </Modal>
  );
};

export default AddCard;
