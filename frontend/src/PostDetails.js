import React from 'react';
import { useHistory } from 'react-router-dom';

function PostDetails({ remove, post }){
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
        <button className="btn btn-info">Edit Post</button>
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{body}</p>
    </>
  )
}

export default PostDetails;