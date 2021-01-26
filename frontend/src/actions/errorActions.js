import { AUTH_ERROR, SEND_POST_ERROR} from "../actionTypes";

export function authError(errorMessage) {
  return { type: AUTH_ERROR, errorMessage };
}

export function sendPostError(errorMessage) {
  return { type: SEND_POST_ERROR, errorMessage }
}