import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CommentsList({ comments, postId }) {

  // const id = postId;
  // let comments = useSelector((st) => st.posts[id].comments)

  function deleteComment(){
    //TODO
  }

  return (
    <>
      {comments.map((c) => (
        <div key={c.id}>
          <p>{c.text}</p>
          <button>Delete</button>
        </div>
      ))}
    </>
  )
}

export default CommentsList;