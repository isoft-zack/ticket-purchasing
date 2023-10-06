import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CardDetailsSection from "../../CardDetailsSection";
import { addCardDetails } from "../../../data/userSlice";

import "./style.scss";

const CardDetails = ({ setMessage }) => {
  const cards = useSelector((store) => store.user.cardDetails);
  const cardDetailsUpdateStatus = useSelector((store) => store.user.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cardDetailsUpdateStatus === "success") {
      setMessage("Card details have been successfully updated");
    }
  }, [cardDetailsUpdateStatus]);

  const handleAddNewCard = () => {
    dispatch(
      addCardDetails({
        user: "Zackary Long",
        cardNumber: 9999,
        expiryDate: "04/28",
        securityCode: 123,
      })
    );
  };

  return (
    <div className="card_details_container">
      <label className="header">
        Payment <CheckCircleOutlineIcon className="checkIcon" />
      </label>
      <label className="sub_header">Use Credit / Debit Card</label>
      {cards.map((card) => (
        <CardDetailsSection key={card.id} cardDetails={card} />
      ))}
      <div className="add-card-container">
        <AddIcon className="addIcon" />
        <CreditCardIcon />
        <Button variant="text" onClick={handleAddNewCard}>
          Add New Card
        </Button>
      </div>
      <label className="sub_header">Or Pay With</label>
      <label className="terms_label">
        By using a digital wallet and continuing past this page, you have read
        and are accepting the{" "}
        <button className="terms_of_use">Terms Of Use</button>
      </label>
    </div>
  );
};

export default CardDetails;
