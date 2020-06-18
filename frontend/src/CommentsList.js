import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CommentsList({ remove, comments, postId }) {

  // const id = postId;
  // let comments = useSelector((st) => st.posts[id].comments)

  function handleDelete(postId, commentId){
    remove({ postId, id: commentId });
  }

  return (
    <>
      {comments.map((c) => (
        <div key={c.id}>
          <p>{c.text}</p>
          <button onClick={() => handleDelete(postId, c.id)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default CommentsList;