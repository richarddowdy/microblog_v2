import axios from "axios";
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

const BASE_API_URL = "http://localhost:5000/api";

export function getAllTitlesFromApi() {
  return async function (dispatch) {
    const res = await axios.get(`${BASE_API_URL}/posts`);
    const titles = res.data;
    dispatch(gotTitles(titles));
  };
}

export function sendPostToApi(data) {
  return async function (dispatch) {
    const res = await axios.post(`${BASE_API_URL}/posts`, data);
    const newPost = res.data;
    dispatch(addPost(newPost));
  };
}

export function getOnePostFromApi(id) {
  return async function (dispatch) {
    const res = await axios.get(`${BASE_API_URL}/posts/${id}`);
    const post = res.data;
    dispatch(gotPost(post));
  };
}

export function addCommentToApi(data) {
  return async function (dispatch) {
    const res = await axios.post(
      `${BASE_API_URL}/posts/${data.postId}/comments`,
      data
    );
    const { id, text } = res.data;
    dispatch(addComment({ postId: data.postId, id, text }));
  };
}

export function removeCommentFromApi(data) {
  return async function (dispatch) {
    const res = await axios.delete(
      `${BASE_API_URL}/posts/${data.postId}/comments/${data.id}`
    );
    const { message } = res.data;
    if (message === "deleted") {
      dispatch(deleteComment({ postId: data.postId, id: data.id }));
    }
    // else {
    //   dispatch(showError({ message }));
    // }
  };
}

export function removePostFromApi(postId) {
  return async function (dispatch) {
    const res = await axios.delete(`${BASE_API_URL}/posts/${postId}`);
    const { message } = res.data;
    if (message === "deleted") {
      dispatch(removePost(postId));
    }
    // else {
    //   dispatch(showError({message}))
    // }
  };
}

export function updatePostToApi(data) {
  return async function (dispatch) {
    const res = await axios.put(`${BASE_API_URL}/posts/${data.postId}`, data);
    const updatedPost = res.data;
    dispatch(editPost(updatedPost));
  };
}

export function sendUpVoteToApi(postId) {
  console.log("vote AC", postId);
  return async function (dispatch) {
    const res = await axios.post(`${BASE_API_URL}/posts/${postId}/vote/up`);
    const updatedVotes = res.data.votes;
    dispatch(upVote({postId, updatedVotes}));
  };
}

export function sendDownVoteToApi(postId) {
  console.log("vote AC", postId);
  return async function (dispatch) {
    const res = await axios.post(`${BASE_API_URL}/posts/${postId}/vote/down`);
    const updatedVotes = res.data.votes;
    console.log(updatedVotes);
    dispatch(downVote({postId, updatedVotes}));
  };
}

