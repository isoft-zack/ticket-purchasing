import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingDetails from "./BookingDetails";
import CardDetails from "./CardDetails";
import DeliveryDetails from "./DeliveryDetails";
import TotalDetails from "./TotalDetails";
import { clearUserStatus } from "../../data/userSlice";
import Snackbar from "@mui/material/Snackbar";
import { clearBillStatus } from "../../data/billSlice";
import "./style.scss";

const CheckoutPage = () => {
  const showDetails = useSelector((store) => store.bill.reservedShowDetails);
  const [quantity, setQuantity] = useState(showDetails.quantity);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setMessage("");
    dispatch(clearUserStatus());
    dispatch(clearBillStatus());
  };

  return (
    <>
      <div className="checkout_container">
        {/* Booking Details Section */}
        <BookingDetails quantity={quantity} setQuantity={setQuantity} />
        <div className="checkout_summary">
          <div className="miscelleneous_details">
            {/* Delivery Details Section */}
            <DeliveryDetails />
            {/* Card Details Section */}
            <CardDetails setMessage={setMessage} />
          </div>
          {/* Total Details Section */}
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
