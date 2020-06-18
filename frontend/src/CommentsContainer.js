import React from 'react';

import CommentsForm from './CommentsForm';
import CommentsList from './CommentsList';

function CommentsContainer() {
  return (
    <>
      <CommentsForm />
      <CommentsList />
    </>
  )
}

export default CommentsContainer;