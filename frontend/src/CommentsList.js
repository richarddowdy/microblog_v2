import React from 'react';

function CommentsList({ remove, comments, postId }) {

  function handleDelete(postId, commentId){
    remove({ postId, id: commentId });
  }

  return (
    <>
      {comments.map((c) => (
        <div className="mb-4" key={c.id}>
          <i className="fa fa-times text-danger mr-4" onClick={() => handleDelete(postId, c.id)}></i>
          <span className="">{c.text}</span>
        </div>
      ))}
    </>
  )
}

export default CommentsList;