import { LOAD_POSTS, ADD_POST } from '../actionTypes';

function gotPosts(posts) {
  return { type: LOAD_POSTS, posts };
}

export function addPost(post){
  return { type: ADD_POST, post }
}