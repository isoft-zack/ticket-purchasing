import React from "react";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./style.scss";

const BookingDetails = ({ quantity, setQuantity }) => {
  const showDetails = useSelector((store) => store.bill.reservedShowDetails);
  const allowedBuyQuantity = [1, 2, 3, 4, 5, 7, 8, 9, 10];

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      {/* Booking Details Section */}
      <div className="booking_details_container">
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
    </>
  );
};

export default BookingDetails;
