import * as types from "./types";

const setReservation = (reservation = {}) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_RESERVATION, payload: reservation });
  } catch (error) {
    console.log(error);
  }
};

const resetReservation = () => async (dispatch) => {
  try {
    dispatch({ type: types.RESET_RESERVATION });
  } catch (error) {
    console.log(error);
  }
};
export { setReservation, resetReservation };
