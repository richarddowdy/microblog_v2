import React from 'react';

import PostForm from './PostForm';

function NewPost() {
  return (
    <div className="mt-5">
      <h1 className="m-auto col-8">New Post</h1>
      <PostForm />
    </div>
  )
}

export default NewPost;