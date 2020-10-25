import * as types from "./types";

const initialState = {
  rooms: [],
  details: { count: 0, filter: "", limit: 0, page: 0, pages: 0 },
  sending: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_ROOM:
      return {
        ...state,
      };
    case types.DELETE_ROOM_FAIL:
      return {
        ...state,
        sending: false,
      };
    case types.DELETE_ROOM_SUCCESS:
      const temp = [...state.rooms];
      action.payload.map((v) => {
        const i = temp.findIndex((t) => t._id === v);
        temp.splice(i, 1);
      });
      return {
        ...state,
        rooms: temp,
        sending: false,
      };
    case types.EDIT_ROOM:
      return {
        ...state,
        sending: true,
      };
    case types.EDIT_ROOM_FAIL:
      return {
        ...state,
        sending: false,
      };
    case types.EDIT_ROOM_SUCCESS:
      const list = [...state.rooms];
      const index = list.findIndex((e) => e._id === action.payload._id);
      list[index] = action.payload;
      return {
        ...state,
        rooms: list,
        sending: false,
      };
    case types.ADD_ROOM:
      return {
        ...state,
        sending: true,
      };
    case types.ADD_ROOM_FAIL:
      return {
        ...state,
        sending: false,
      };
    case types.ADD_ROOM_SUCCESS:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        sending: false,
      };
    case types.FETCH_LIST_ROOMS:
      return {
        ...state,
        sending: true,
      };
    case types.FETCH_LIST_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
        details: action.payload.details,
        sending: false,
      };
    case types.FETCH_LIST_ROOMS_FAIL:
      return {
        ...state,
        sending: false,
      };
    default:
      return state;
  }
};

export default reducer;
