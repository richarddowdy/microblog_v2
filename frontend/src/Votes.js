import React from "react";
import { useDispatch } from "react-redux";
import { sendUpVoteToApi, sendDownVoteToApi } from "./actionCreators";
import "./Votes.css";

function Votes({ postId, votes }) {
  const dispatch = useDispatch();

  function handleUpVote(postId) {
    dispatch(sendUpVoteToApi(postId));
  }

  function handleDownVote(postId) {
    dispatch(sendDownVoteToApi(postId));
  }

  return (
    <>
      <span className="mr-3">{votes} Votes</span>
      <i className="far fa-thumbs-up mr-3 up_vote pointer" onClick={() => handleUpVote(postId)}></i>
      <i className="far fa-thumbs-down down_vote pointer" onClick={() => handleDownVote(postId)}></i>
    </>
  );
}

export default Votes;
