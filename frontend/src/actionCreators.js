import axios from "axios";
import { loginUser, userLogout, currentUser } from "./actions/userActions";
import { gotTitles } from "./actions/titlesActions";
import {
  addPost,
  gotPost,
  removePost,
  addComment,
  deleteComment,
  editPost,
  upVote,
  downVote,
} from "./actions/postsActions";
import { decode } from "jsonwebtoken";
import { invalid_login } from "./actions/errorActions";
import { toast } from "react-toastify";

export const BASE_API_URL = "http://localhost:5000/api";

export function getAllTitlesFromApi() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${BASE_API_URL}/posts`);
      const titles = res.data;
      // console.log("all titles fetched", titles);
      dispatch(gotTitles(titles));
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function sendPostToApi(data) {
  return async function (dispatch) {
    try {
      console.log("trying with", data);
      const res = await axios.post(`${BASE_API_URL}/posts`, data);
      console.log("response", res.data);
      const newPost = res.data;
      dispatch(addPost(newPost));
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function getOnePostFromApi(id) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${BASE_API_URL}/posts/${id}`);
      const post = res.data;
      dispatch(gotPost(post));
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function addCommentToApi(data) {
  console.log(data);
  return async function (dispatch) {
    try {
      const res = await axios.post(`${BASE_API_URL}/posts/${data.postId}/comments`, data);
      const { id, text, author } = res.data;
      dispatch(addComment({ postId: data.postId, id, text, author }));
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function removeCommentFromApi(data) {
  return async function (dispatch) {
    try {
      const res = await axios.delete(`${BASE_API_URL}/posts/${data.postId}/comments/${data.id}`);
      const { message } = res.data;
      if (message === "deleted") {
        dispatch(deleteComment({ postId: data.postId, id: data.id }));
      }
      // else {
      //   TODO - dispatch(showError({ message }));
      // }
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function removePostFromApi(postId) {
  return async function (dispatch) {
    try {
      const res = await axios.delete(`${BASE_API_URL}/posts/${postId}`);
      const { message } = res.data;
      if (message === "deleted") {
        dispatch(removePost(postId));
      }
      // else {
      //   TODO - dispatch(showError({ message }))
      // }
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function updatePostToApi(data) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${BASE_API_URL}/posts/${data.postId}`, data);
      const updatedPost = res.data;
      dispatch(editPost(updatedPost));
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function sendUpVoteToApi(postId) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${BASE_API_URL}/posts/${postId}/vote/up`);
      const updatedVotes = res.data.votes;
      dispatch(upVote({ postId, updatedVotes }));
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function sendDownVoteToApi(postId) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${BASE_API_URL}/posts/${postId}/vote/down`);
      const updatedVotes = res.data.votes;
      dispatch(downVote({ postId, updatedVotes }));
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function postNewUserToApi(userData) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${BASE_API_URL}/users`, userData);
      const token = res.data.token;
      const user = res.data.user;
      if (user) {
        localStorage.setItem("_token", token);
        dispatch(loginUser({ user }));
      }
      // else{
      //   dispatch(showError({ message }))
      // }
    } catch (err) {
      //TODO - error handling
    }
  };
}

// This has been moved to the login component
// export function userLoginToApi(userData, signUp=false) {
//   return async function (dispatch) {
//     try {
//       let authType = signUp ? "users" : "login";
//       const res = await axios.post(`${BASE_API_URL}/${authType}`, userData);
//       console.log(res)
//       const token = res.data.token;
//       const user = decode(token);
//       console.log("just logged in to this account" ,user)

//       localStorage.setItem("_token", token);
//       dispatch(loginUser(user));
//     } catch (err) { //TODO
//       console.log(err.response.data) // <- this is the proper way to catch errors from backend
//       dispatch(invalid_login(err.response.data.message));
//     }
//   };
// }

export function logoutUser() {
  return function (dispatch) {
    try {
      localStorage.removeItem("_token");
      dispatch(userLogout());
    } catch (err) {
      //TODO - error handling
    }
  };
}

export function getCurrentUserFromApi(username) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${BASE_API_URL}/${username}`);
      const user = res.data;
      dispatch(loginUser(user));
    } catch (err) {
      //TODO - error handling
    }
  };
}
