import axios from "axios";
import { gotTitles, } from './actions/titlesActions';
import { addPost, gotPost, addComment } from './actions/postsActions';

const BASE_API_URL = "http://localhost:5000/api";

// export function getPostsFromApi() {
//   return async function(dispatch){
//     let res = await axios.get(`${BASE_API_URL}/posts`);
//     dispatch(gotPosts(res.data));
//   };
// }

/*
*** TODO ***
**/
export function getAllTitlesFromApi() {
  return async function(dispatch){
    const res = await axios.get(`${BASE_API_URL}/posts`)
    const titles = res.data
    dispatch(gotTitles(titles))
  }
}

export function sendPostToApi(data) {
  return async function(dispatch) {
    const res = await axios.post(`${BASE_API_URL}/posts`, data)
    const newPost = res.data
    dispatch(addPost(newPost));
  }
}

export function getOnePostFromApi(id) {
  return async function(dispatch){
    const res = await axios.get(`${BASE_API_URL}/posts/${id}`)
    const post = res.data;
    dispatch(gotPost(post));
  }
}

export function addCommentToApi(data){
  return async function(dispatch){
    const res = await axios.post(`${BASE_API_URL}/posts/${data.postId}/comments`, data)
    const {id, text} = res.data;
    dispatch(addComment({postId: data.postId, id, text }));
  }
}

// function gotPosts(posts) {
//   return { type: 'LOAD_POSTS', posts };
// }