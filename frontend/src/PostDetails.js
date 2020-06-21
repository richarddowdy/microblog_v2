import React from "react";
import { useHistory } from "react-router-dom";

import Votes from "./Votes";

function PostDetails({ toggleEditing, remove, post }) {
  const { id, title, description, body, votes } = post;
  const history = useHistory();

  function handleDelete(id) {
    remove(id);
    history.push("/");
  }

  return (
    <div className="mt-5 ml-5">
      <div className="float-right">
        <div className="text-right">
          <i
            className="far fa-edit fa-2x text-info mr-4 pointer"
            onClick={() => toggleEditing()}
          ></i>
          <i
            className="fas fa-times fa-2x text-danger pointer"
            onClick={() => handleDelete(id)}
          ></i>
        </div>
        <br />
        <Votes postId={id} votes={votes} />
      </div>
      <h1 className="display-3 font-weight-bold">{title}</h1>
      <h2 className="mt-3">{description}</h2>
      <p className="mt-5">{body}</p>
    </div>
  );
}

export default PostDetails;