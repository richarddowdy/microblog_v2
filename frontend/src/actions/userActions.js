import { LOGIN_USER, LOGOUT_USER } from '../actionTypes';

export function loginUser(user){
  console.log("login action", user);
  return { type: LOGIN_USER, user }
}

export function logoutUser(user){
  return { type: LOGOUT_USER };
}