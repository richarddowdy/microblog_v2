import {
  FETCH_POST,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  UP_VOTE,
  DOWN_VOTE,
} from "../actionTypes";

export function gotPost(post) {
  return { type: FETCH_POST, post };
}

export function addPost(post) {
  return { type: ADD_POST, post };
}

export function removePost(postId) {
  return { type: REMOVE_POST, postId };
}

export function editPost(post) {
  return { type: EDIT_POST, post };
}

export function addComment(commentObj) {
  return { type: ADD_COMMENT, commentObj };
}

export function deleteComment(commentObj) {
  return { type: DELETE_COMMENT, commentObj };
}

export function upVote(data){
  return { type: UP_VOTE, data }
}

export function downVote(data){
  return { type: DOWN_VOTE, data}
}
