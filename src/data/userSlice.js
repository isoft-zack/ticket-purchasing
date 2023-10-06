import { createSlice } from "@reduxjs/toolkit";
let id = 0;

const userSlice = createSlice({
  name: "loggedInUser",
  initialState: {
    cardDetails: [
      {
        id: ++id,
        user: "Zackary Long",
        cardNumber: 9999,
        expiryDate: "04/28",
        securityCode: 123,
      },
    ],
    status: "",
    error: "",
  },
  reducers: {
    addCardDetails: (state, action) => {
      state.cardDetails.push({
        user: action.payload.user,
        cardNumber: action.payload.cardNumber,
        expiryDate: action.payload.expiryDate,
        securityCode: action.payload.securityCode,
        id: ++id,
      });
      state.status = "success";
    },
    editCardDetails: (state, action) => {
      let cardIndex = state.cardDetails.findIndex(
        (card) => card.id === action.payload.id
      );
      state.cardDetails[cardIndex] = {
        user: action.payload.user,
        cardNumber: action.payload.cardNumber,
        expiryDate: action.payload.expiryDate,
        securityCode: action.payload.securityCode,
        id: action.payload.id,
      };
      state.status = "success";
    },
    deleteCardDetails: (state, action) => {
      state.cardDetails = state.cardDetails.filter(
        (card) => card.id !== action.payload.id
      );
      state.status = "success";
    },
    clearUserStatus: (state) => {
      state.status = "";
    },
  },
});

export default userSlice.reducer;
export const {
  addCardDetails,
  editCardDetails,
  deleteCardDetails,
  clearUserStatus,
} = userSlice.actions;
