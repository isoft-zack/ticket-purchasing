import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from '@mui/icons-material/Add';
import CardDetailsSection from "../../CardDetailsSection";
import { editCardDetails } from "../../../data/userSlice";
import "./style.scss";

const CardDetails = ({ setMessage }) => {
  const { user, cardNumber, expiryDate, securityCode, id } = useSelector(
    (store) => store.user.cardDetails[0]
  );
  const cardDetailsUpdateStatus = useSelector((store) => store.user.status);

  const [isCardDetailsEditable, setIsCardDetailsEditable] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber,
    user,
    expiryDate,
    securityCode,
    id,
  });

  const dispatch = useDispatch();

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

  return (
    <div className="card_details_container">
      <label className="header">
        Payment <CheckCircleOutlineIcon className="checkIcon" />
      </label>
      <label className="sub_header">Use Credit / Debit Card</label>
      <CardDetailsSection
        cardDetails={cardDetails}
        updateCardDetailsStateValue={updateCardDetailsStateValue}
        isCardDetailsEditable={isCardDetailsEditable}
      />
      <label className="sub_header">Or Pay With</label>
      <label className="terms_label">
        By using a digital wallet and continuing past this page, you have read and are accepting the{" "}
        <button className="terms_of_use">Terms Of Use</button>
      </label>
      <button className="edit_class_details" onClick={handleEditCardDetails}>
        {isCardDetailsEditable ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default CardDetails;
