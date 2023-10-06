import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import { addFinalBookingDetails } from "../../../data/billSlice";
import "./style.scss";

const TotalDetails = ({ quantity, setMessage }) => {
  const showDetails = useSelector((store) => store.bill.reservedShowDetails);
  const { serviceFees, deliveryFees, orderProcessingFees } = useSelector(
    (store) => store.bill.otherCharges
  );
  const orderPlacementStatus = useSelector((store) => store.bill.status);

  const [finalTotal, setFinalTotal] = useState(0);
  const [isTermsAgreed, setTermsAgreed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderPlacementStatus === "success") {
      setMessage("Order has been placed successfully");
    }
  }, [orderPlacementStatus]);

  useEffect(() => {
    setFinalTotal(
      showDetails.perTicketPrice * quantity +
        serviceFees * quantity +
        deliveryFees
    );
  }, [quantity, deliveryFees, serviceFees, showDetails.perTicketPrice]);

  const handleChangeOfTermsConsent = () => {
    setTermsAgreed(!isTermsAgreed);
  };

  const handlePlaceOrderBtn = () => {
    dispatch(
      addFinalBookingDetails({
        showName: showDetails.name,
        quantity,
        date: showDetails.date,
        totalValue: finalTotal,
      })
    );
  };

  return (
    <>
      {/* Total Details Section */}
      <div className="total_details_container total_bill_container">
        <div className="final_total">
          <label className="header">Total</label>
          <label className="header">${finalTotal}</label>
        </div>
        <label className="sub_header">Tickets</label>
        <div className="sub_summary">
          <label className="internal_details">
            Resale Tickets: ${showDetails.perTicketPrice} X {quantity}
          </label>
          <label className="internal_details">
            {showDetails.perTicketPrice * quantity}$
          </label>
        </div>
        <label className="sub_header">Notes From Seller</label>
        <label className="internal_details">
          <div>
            xfr XFER Proof of as least one dose of COVID-19 vaccination for ages
            5 to 11 and guests ages 12 and up will be required to show proof of
            two COVID-19 vaccine does or one dose of the Johnson & Johnson
            vaccine.
          </div>
          <div>Masks must be worn.</div>
        </label>
        <label className="sub_header">Fees</label>
        <div className="sub_summary">
          <label className="internal_details">
            Service Fee: ${serviceFees} X {quantity}
          </label>
          <label className="internal_details">{serviceFees * quantity}$</label>
        </div>
        <div className="sub_summary">
          <label className="internal_details">Order Processing Fee</label>
          <label className="internal_details">{orderProcessingFees}$</label>
        </div>
        <label className="sub_header"> Delivery</label>
        <div className="sub_summary">
          <label className="internal_details">Mobile Entry</label>
          <label className="internal_details">
            {deliveryFees ? `$${deliveryFees}` : "Free"}
          </label>
        </div>
        <label className="sub_header"> *All Sales Final - No Refunds</label>
        <div className="terms_container">
          <Checkbox
            checked={isTermsAgreed}
            onChange={handleChangeOfTermsConsent}
            inputProps={{ "aria-label": "controlled" }}
          />
          <label className="terms_label">
            {" "}
            I have read and agree to the{" "}
            <button className="terms_of_use">Terms Of Use</button>
          </label>
        </div>
        <button
          onClick={handlePlaceOrderBtn}
          className="place_order_btn"
          disabled={!isTermsAgreed}
        >
          Place Order
        </button>
        <label className="disclaimer">
          *Exemptions may apply, see our terms of Use
        </label>
      </div>
    </>
  );
};

export default TotalDetails;
