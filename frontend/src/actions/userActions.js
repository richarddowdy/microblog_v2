import { LOGIN_USER, LOGOUT_USER, CURRENT_USER } from '../actionTypes';

export function loginUser(user){
  // console.log("login action", user);
  return { type: LOGIN_USER, user };
}

export function userLogout(user){
  return { type: LOGOUT_USER };
}

export function currentUser(user){
  return { type: CURRENT_USER, user };
}
