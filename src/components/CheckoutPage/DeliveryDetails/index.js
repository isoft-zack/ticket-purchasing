import React from "react";
import { useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./style.scss";

const DeliveryDetails = () => {
  const showDetails = useSelector((store) => store.bill.reservedShowDetails);
  const { deliveryFees } = useSelector((store) => store.bill.otherCharges);

  return (
    <div className="delivery_details_container">
      <label className="header">
        Delivery <CheckCircleOutlineIcon className="checkIcon" />
      </label>
      <label className="sub_header">{`Mobile Entry - ${
        deliveryFees || "Free"
      }`}</label>
      <label className="delivery_info internal_details">
        <div>Tickets Available by {showDetails.date || "-"}</div>
        <div>
          These mobile tickets will be transferred directly to you from a
          trusted seller. We'll email you instructions on how to accept them on
          the original ticket provider's mobile app.
        </div>
      </label>
    </div>
  );
};

export default DeliveryDetails;
