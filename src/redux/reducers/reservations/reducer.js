import * as types from "./types";

const initialState = {
  reservation: {},
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
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
