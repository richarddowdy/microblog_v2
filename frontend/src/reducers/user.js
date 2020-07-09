import { LOGIN_USER, LOGOUT_USER } from '../actionTypes';

const INITIAL_STATE = {};

const userReducers = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN_USER:
      return { ...state, currentUser: action.user }

  
    case LOGOUT_USER:
      return { ...state, currentUser: {} }

    default:
      return state;
  }
}

export default userReducers;