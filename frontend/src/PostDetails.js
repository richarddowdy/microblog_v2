import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Votes from "./Votes";
import "./PostDetails.css";
import { useSelector } from "react-redux";

function PostDetails({ toggleEditing, remove, post }) {
  const currentUser = useSelector((st) => st.user) || null;
  const { id, title, description, body, votes, username, user_id } = post;
  const history = useHistory();

  function handleDelete(id) {
    remove(id);
    history.push("/");
  }

  return (
    <div className="mt-4 ml-4">
      <div className="post-controls">
        <div className="api-buttons">
          {currentUser.username === username || currentUser.is_admin ? (
            <div>
              <i className="far fa-edit fa-2x mr-4 edit_icon pointer" onClick={() => toggleEditing()}></i>
              <i className="fas fa-times fa-2x text-danger pointer" onClick={() => handleDelete(id)}></i>
            </div>
          ) : null}
        </div>
        <br />
        <Votes postId={id} votes={votes} />
      </div>
      <h1>{title}</h1>
      <h2 className="mt-3">{description}</h2>
      <div>
        Author:
        <Link to={`/?profile=${username}`} className="ml-2 ">
          {username}
        </Link>
      </div>
      <p className="mt-5">{body}</p>
    </div>
  );
}

export default PostDetails;
