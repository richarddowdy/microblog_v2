import { FETCH_TITLES } from '../actionTypes';

export function gotTitles(titles) {
  return { type: FETCH_TITLES, titles };
}