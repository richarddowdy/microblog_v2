import React from 'react';

function CommentsList({ remove, comments, postId }) {

  function handleDelete(postId, commentId){
    remove({ postId, id: commentId });
  }

  // Sorts comments in descending order of id
  // so that the newest comment appears a the top of the list
  // and pushes older comments down.
  comments.sort((a,b) => b.id - a.id)

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