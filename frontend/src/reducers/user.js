import { LOGIN_USER, LOGOUT_USER } from '../actionTypes';

const INITIAL_STATE = {};

const userReducers = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_USER:
      return { ...state, ...action.user }

  
    case LOGOUT_USER:
      return { }

    default:
      return state;

    // case CURRENT_USER:
    //   return { ...state, ...action.user };
  }
}

export default userReducers;