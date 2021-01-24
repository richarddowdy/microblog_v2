import { AUTH_ERROR } from "../actionTypes";

export function authError(errorMessage) {
  return { type: AUTH_ERROR, errorMessage };
}