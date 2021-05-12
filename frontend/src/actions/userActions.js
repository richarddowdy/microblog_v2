import { LOGIN_USER, LOGOUT_USER, CURRENT_USER } from "../actionTypes";

export function loginUser(user) {
  return { type: LOGIN_USER, user };
}

export function userLogout() {
  return { type: LOGOUT_USER };
}

export function currentUser(user) {
  return { type: CURRENT_USER, user };
}
