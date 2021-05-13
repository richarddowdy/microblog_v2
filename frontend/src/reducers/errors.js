import { AUTH_ERROR, SEND_POST_ERROR } from "../actionTypes";

const INITIAL_STATE = { errorMessage: "" };

const errorReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return { loginError: action.errorMessage };

    case SEND_POST_ERROR:
      return { sendPostError: action.errorMessage };

    default:
      return state;
  }
};

export default errorReducers;
