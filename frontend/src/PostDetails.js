import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Votes from "./Votes";
import './PostDetails.css';
import { useSelector } from "react-redux";

function PostDetails({ toggleEditing, remove, post }) {
  const currentUser = useSelector((st) => (st.user.username)) || null;
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
          {currentUser === username ? 
           <i
           className="far fa-edit fa-2x text-info mr-4 pointer"
           onClick={() => toggleEditing()}
         ></i>
          :
            null
          }
          <i
            className="fas fa-times fa-2x text-danger pointer"
            onClick={() => handleDelete(id)}
          ></i>
        </div>
        <br />
        <Votes postId={id} votes={votes} />
      </div>
      <h1>{title}</h1>
      <h2 className="mt-3">{description}</h2>
      <div>
        Author: 
        <Link
          to={`/users/${user_id}`}
          className="ml-2 "
        >
          {username}
        </Link>
      </div>
      <p className="mt-5" >{body}</p>
    </div>
  );
}

export default PostDetails;
