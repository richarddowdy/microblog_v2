import axios from "axios";
import { gotTitles, } from './actions/titlesActions';
import { addPost, } from './actions/postsActions';

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

// function gotPosts(posts) {
//   return { type: 'LOAD_POSTS', posts };
// }