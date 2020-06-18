import React from 'react';

function Comment({ text, deleteComment }){

  function handleClick(){
    deleteComment();
  }

  return (
    <>
      <p>{text}</p>
      <button onClick={handleClick}>Delete</button>
    </>
  )
}

export default Comment;