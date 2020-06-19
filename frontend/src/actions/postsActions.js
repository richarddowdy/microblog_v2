import { FETCH_POST, ADD_POST, REMOVE_POST, ADD_COMMENT, DELETE_COMMENT } from '../actionTypes';

export function gotPost(post) {
  return { type: FETCH_POST, post };
}

export function addPost(post){
  return { type: ADD_POST, post }
}

export function removePost(postId){
  return { type: REMOVE_POST, postId }
}

export function addComment(commentObj){
  return { type: ADD_COMMENT, commentObj}
}

export function deleteComment(commentObj){
  return { type: DELETE_COMMENT, commentObj };
}