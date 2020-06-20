import React from 'react';
import { useHistory } from 'react-router-dom';

function PostDetails({ toggleEditing, remove, post }){
  const { id, title, description, body } = post
  const history = useHistory();

  function handleDelete(id){
    remove(id);
    history.push('/')
  }

  return (
    <>
      <div className="controls float-right">
        <button 
          className="btn btn-danger"
          onClick={() => handleDelete(id)}>Delete Post</button>
        <button
          className="btn btn-info"
          onClick={() => toggleEditing()}
          >Edit Post</button>
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{body}</p>
      <i className="fa fa-arrow-up fa-3x text-success mr-3"></i>
      <i className="fa fa-arrow-down fa-3x text-danger"></i>

    </>
  )
}

export default PostDetails;