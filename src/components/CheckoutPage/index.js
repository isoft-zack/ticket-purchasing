import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CardDetailsSection from "../CardDetailsSection";
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
  const allowedBuyQuantity = [1, 2, 3, 4, 5, 7, 8, 9, 10];
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

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

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
        {/* Booking Details Section */}
        <div className="sub_section_container">
          <label className="header">Booking Details</label>
          <div className="booked_show_details">
            <div className="checkout_show_details">
              <label className="sub_header">{showDetails.name}</label>
              <label className="show_price">
                Price per ticket: ${showDetails.perTicketPrice || "-"}
              </label>
              <label className="internal_details">
                Will be held on: {showDetails.date || "-"}
              </label>
            </div>
            <div className="qty_cta_container">
              <label className="internal_details">Quantity</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={quantity}
                label="Quantity"
                onChange={handleChange}
              >
                {allowedBuyQuantity.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
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
