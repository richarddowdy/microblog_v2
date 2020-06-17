import { FETCH_POST, ADD_POST } from '../actionTypes';

export function gotPost(post) {
  console.log("action", post)
  return { type: FETCH_POST, post };
}

export function addPost(post){
  return { type: ADD_POST, post }
}