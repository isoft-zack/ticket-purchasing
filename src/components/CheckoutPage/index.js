import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CardDetailsSection from "../CardDetailsSection";
import BookingDetails from "./BookingDetails";
import TotalDetails from "./TotalDetails";
import { clearUserStatus, editCardDetails } from "../../data/userSlice";
import Snackbar from "@mui/material/Snackbar";
import { clearBillStatus } from "../../data/billSlice";
import "./style.scss";

const CheckoutPage = () => {
  const showDetails = useSelector((store) => store.bill.reservedShowDetails);
  const { user, cardNumber, expiryDate, securityCode, id } = useSelector(
    (store) => store.user.cardDetails[0]
  );
  const { deliveryFees } = useSelector((store) => store.bill.otherCharges);
  const cardDetailsUpdateStatus = useSelector((store) => store.user.status);
  const [quantity, setQuantity] = useState(showDetails.quantity);
  const [isCardDetailsEditable, setIsCardDetailsEditable] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const [cardDetails, setCardDetails] = useState({
    cardNumber: cardNumber,
    user: user,
    expiryDate: expiryDate,
    securityCode: securityCode,
    id: id,
  });

  useEffect(() => {
    if (cardDetailsUpdateStatus === "success") {
      setMessage("Card details have been successfully updated");
    }
  }, [cardDetailsUpdateStatus]);

  const handleEditCardDetails = () => {
    setIsCardDetailsEditable(!isCardDetailsEditable);
    if (isCardDetailsEditable) {
      dispatch(editCardDetails(cardDetails));
    }
  };

  const updateCardDetailsStateValue = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setMessage("");
    dispatch(clearUserStatus());
    dispatch(clearBillStatus());
  };

  return (
    <>
      <div className="checkout_container">
        <BookingDetails quantity={quantity} setQuantity={setQuantity} />
        <div className="checkout_summary">
          <div className="miscelleneous_details">
            {/* Delivery Details Section */}
            <div className="sub_section_container">
              <label className="header">
                Delivery <CheckCircleOutlineIcon className="checkIcon" />
              </label>
              <label className="sub_header">{`Mobile Entry - ${
                deliveryFees || "Free"
              }`}</label>
              <label className="delivery_info internal_details">
                <div>Tickets Available by {showDetails.date || "-"}</div>
                <div>
                  These mobile tickets will be transferred directly to you from
                  a trusted seller. We'll email you instructions on how to
                  accept them on the original ticket provider's mobile app.
                </div>
              </label>
            </div>
            {/* Card Details Section */}
            <div className="sub_section_container">
              <label className="header">
                Payment <CheckCircleOutlineIcon className="checkIcon" />
              </label>
              <label className="sub_header">Use Credit / Debit Card</label>
              <CardDetailsSection
                cardDetails={cardDetails}
                updateCardDetailsStateValue={updateCardDetailsStateValue}
                isCardDetailsEditable={isCardDetailsEditable}
              />
              <button
                className="edit_class_details"
                onClick={handleEditCardDetails}
              >
                {isCardDetailsEditable ? "Save" : "Edit"}
              </button>
            </div>
          </div>
          <TotalDetails quantity={quantity} setMessage={setMessage} />
        </div>
      </div>
      <Snackbar
        open={message.length > 0}
        autoHideDuration={1700}
        onClose={handleSnackbarClose}
        message={message}
      />
    </>
  );
};

export default CheckoutPage;
