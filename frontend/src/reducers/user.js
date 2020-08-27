import { LOGIN_USER, LOGOUT_USER } from '../actionTypes';

const INITIAL_STATE = {};

const userReducers = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_USER:
      return { ...state, ...action.user }

  
    case LOGOUT_USER:
      return { ...state, INITIAL_STATE }

    default:
      return state;
  }
}

export default userReducers;