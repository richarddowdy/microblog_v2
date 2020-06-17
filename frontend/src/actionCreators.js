import axios from "axios";
import { gotTitles } from './actions/titlesActions'

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
    let res = await axios.get(`${BASE_API_URL}/posts`)
    const titles = res.data
    dispatch(gotTitles(titles))
  }
}

// function gotPosts(posts) {
//   return { type: 'LOAD_POSTS', posts };
// }