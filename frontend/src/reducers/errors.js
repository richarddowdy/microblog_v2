import { AUTH_ERROR, SEND_POST_ERROR } from '../actionTypes';

const INITIAL_STATE = {errorMessage: ""};

const errorReducers = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_ERROR:
      console.log("error action", action);
      return { loginError: action.errorMessage };

    case SEND_POST_ERROR:
      console.log("send post error", action);
      return { sendPostError: action.errorMessage } 
      
    default:
      return state;
  }
}

export default errorReducers;