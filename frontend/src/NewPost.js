import React from "react";
import PostForm from "./PostForm";
import { sendPostToApi } from "./actionCreators";
import { sendPostError } from "./actions/errorActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function NewPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((st) => st.user);

  const INITIAL_STATE = {
    title: "",
    description: "",
    body: "",
  };

  function add({ title, description, body }) {
    try {
      dispatch(sendPostToApi({ title, description, body, user }));
      history.push("/");
    } catch (err) {
      dispatch(sendPostError(err.response.data.message));
    }
  }

  function cancel() {
    history.push("/");
  }

  return (
    <div className="mt-5">
      <h1 className="m-auto col-8">New Post</h1>
      <PostForm save={add} cancel={cancel} post={INITIAL_STATE} />
    </div>
  );
}

export default NewPost;
