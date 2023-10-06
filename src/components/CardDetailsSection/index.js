import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import PaymentIcon from "@mui/icons-material/Payment";
import Radio from "@mui/material/Radio";
import { deleteCardDetails, editCardDetails } from "../../data/userSlice";

import "./style.scss";

const CardDetailsSection = ({ cardDetails }) => {
  const [isCardDetailsEditable, setIsCardDetailsEditable] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    updateCardDetailsStateValue(e);
  };

  const updateCardDetailsStateValue = (e) => {
    dispatch(
      editCardDetails({
        ...cardDetails,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleEditCardDetails = () => {
    setIsCardDetailsEditable(!isCardDetailsEditable);
    if (isCardDetailsEditable) {
      dispatch(editCardDetails(cardDetails));
    }
  };

  const handleDeleteCardDetails = () => {
    dispatch(deleteCardDetails(cardDetails));
  };

  return (
    <div className="card_details_section_container">
      <div className="card_radio">
        <FormControlLabel value="visa" control={<Radio />} />
      </div>
      <div className="card_details_info_container">
        <div className="info_container">
          <div className="card_image">Visa</div>
          <div className="details_container">
            <div className="card_number">
              <label className="input_label bold_label">Visa -</label>
              <input
                type="number"
                className="input_box large_input_box"
                name="cardNumber"
                id={cardDetails.id}
                value={cardDetails.cardNumber}
                onChange={handleChange}
                disabled={!isCardDetailsEditable}
              />
            </div>
            <div className="card_username_expire_date">
              <input
                type="text"
                className="user_name input_box large_input_box"
                name="user"
                placeholder="Card Holders Name:"
                id={cardDetails.id}
                value={cardDetails.user}
                onChange={handleChange}
                disabled={!isCardDetailsEditable}
              />
              <div className="expire_date">
                <label className="input_label bold_label">exp.</label>
                <input
                  type="text"
                  className="input_box small_input_box"
                  name="expiryDate"
                  id={cardDetails.id}
                  value={cardDetails.expiryDate}
                  onChange={handleChange}
                  disabled={!isCardDetailsEditable}
                />
              </div>
            </div>
            <div className="button_container">
              <Button
                className="edit_button"
                variant="text"
                onClick={handleEditCardDetails}
              >
                {isCardDetailsEditable ? "Save" : "Edit"}
              </Button>
              <Button variant="text" onClick={handleDeleteCardDetails}>
                Delete
              </Button>
            </div>
          </div>
        </div>
        <div className="security_code_container">
          <label className="input_label security_label">Security Code:</label>
          <div className="security_assets_container">
            <input
              type="password"
              className="input_box small_input_box"
              name="securityCode"
              id={cardDetails.id}
              value={cardDetails.securityCode}
              onChange={handleChange}
              disabled={!isCardDetailsEditable}
            />
            <div className="security_card_description">
              <PaymentIcon />
              <label className="input_label">3-digits on back of card</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsSection;
