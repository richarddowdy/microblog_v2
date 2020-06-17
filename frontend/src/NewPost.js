import React from 'react';

import PostForm from './PostForm';
import { sendPostToApi } from './actionCreators'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NewPost() {

  const dispatch = useDispatch();
  const history = useHistory();

  function add({ title, description, body }) {
    dispatch(sendPostToApi({ title, description, body }));
    history.push('/')
  };

  function cancel() {
    history.push('/')
  }

  return (
    <div className="mt-5">
      <h1 className="m-auto col-8">New Post</h1>
      <PostForm save={add} cancel={cancel}/>
    </div>
  )
}

export default NewPost;