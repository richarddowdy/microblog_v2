import { LOAD_TITLES } from '../actionTypes';

export function gotTitles(titles) {
  return { type: LOAD_TITLES, titles };
}