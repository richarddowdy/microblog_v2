import React from "react";
import { useDispatch } from "react-redux";
import { sendUpVoteToApi, sendDownVoteToApi } from "./actionCreators";

function Votes({ postId, votes }) {
  const dispatch = useDispatch();

  function handleUpVote(postId) {
    console.log("upvote post#", postId);
    dispatch(sendUpVoteToApi(postId));
  }

  function handleDownVote(postId) {
    console.log("downvote post#", postId);
    dispatch(sendDownVoteToApi(postId));
  }

  return (
    <>
      <span className="mr-3">{votes} Votes</span>
      <i
        className="far fa-thumbs-up text-success mr-3 pointer"
        onClick={() => handleUpVote(postId)}
      ></i>
      <i
        className="far fa-thumbs-down text-danger pointer"
        onClick={() => handleDownVote(postId)}
      ></i>
    </>
  );
}

export default Votes;
