import { LOAD_TITLES } from '../actionTypes';

function gotTitles(titles) {
  return { type: LOAD_TITLES, titles };
}