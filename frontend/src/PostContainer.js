import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getOnePostFromApi } from './actionCreators'
import CommentsContainer from './CommentsContainer';
import CommentsForm from './CommentsForm';

function PostContainer(){
  const dispatch = useDispatch();
  const id = Number(useParams().id);
  const post = useSelector((st) => st.posts[id]);

  const state = useSelector((st) => st);
  console.log('current state', state);


  useEffect(() => {
    // console.log("useEffect")
    async function fetchPost(){
      dispatch(getOnePostFromApi(id));
    }
    if(!post){
      fetchPost();
    }
  }, [post, id, dispatch])

  return (
    <div className="col-8">
      { post !== undefined ?
        <>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p>{post.body}</p>
          <hr/>
          <h1>Comments Container</h1>
          <CommentsContainer />
        </>
      :
      <p>Nope</p>}
    </div>
  )
};

export default PostContainer;