// boardsReducer.js

// Define initial state
export const initialState = {
  boards: [],
  loading: false,
  error: null,
};

// Define action types
export const actionTypes = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
  ADD_BOARD: "ADD_BOARD",
  RESET_ERROR: "RESET_ERROR",
};

// Define reducer function
export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_SUCCESS:
      return { ...state, loading: false, boards: action.payload };
    case actionTypes.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.ADD_BOARD:
      return { ...state, boards: [...state.boards, action.payload] };
    case actionTypes.RESET_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Define action creators
export const actions = {
  fetchStart: () => ({ type: actionTypes.FETCH_START }),
  fetchSuccess: (payload) => ({ type: actionTypes.FETCH_SUCCESS, payload }),
  fetchFailure: (payload) => ({ type: actionTypes.FETCH_FAILURE, payload }),
  addBoard: (payload) => ({ type: actionTypes.ADD_BOARD, payload }),
  resetError: () => ({ type: actionTypes.RESET_ERROR }),
};
