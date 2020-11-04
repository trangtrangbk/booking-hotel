import * as types from "./types";

const initialState = {
  reservation: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_RESERVATION:
      return {
        ...state,
        reservation: action.payload,
      };
    case types.RESET_RESERVATION:
      return {
        reservation : null
      };
    default:
      return state;
  }
};

export default reducer;
