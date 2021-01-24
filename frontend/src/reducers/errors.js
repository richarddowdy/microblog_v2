import { AUTH_ERROR } from '../actionTypes';

const INITIAL_STATE = {errorMessage: ""};

const errorReducers = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_ERROR:
      console.log("error action", action);
      return {loginError: action.errorMessage };

    default:
      return state;
  }
}

export default errorReducers;