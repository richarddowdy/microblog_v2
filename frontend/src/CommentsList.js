import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Comment from './Comment';

function CommentsList() {

  const id = Number(useParams().id);
  let comments = useSelector((st) => st.posts[id].comments)

  function deleteComment(){
    //TODO
  }

  console.log("comments", comments);
  return (
    <>
      {comments.map((c) => (
        <Comment key={c.id} text={c.text} deleteComment={deleteComment} />
      ))}
    </>
  )
}

export default CommentsList;