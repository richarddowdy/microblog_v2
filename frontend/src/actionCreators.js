import axios from "axios";

const BASE_API_URL = "http://localhost:5000/api";

export function getPostsFromApi() {
  return async function(dispatch){
    let res = await axios.get(`${BASE_API_URL}/posts`);
    dispatch(gotPosts(res.data));
  };
}

/*
*** TODO ***
**/
// export function getTitlesFromApi() {
//   return async function(dispatch){
//     let res = await axios.get(`${BASE_API_URL}/posts`)
//     const titles = res.data.map(post => { // unsure about this exact syntax
//       return { postId, title, description}
//     })
//     dispatch(gotTitles(titles))
//   }
// }

// function gotPosts(posts) {
//   return { type: 'LOAD_POSTS', posts };
// }