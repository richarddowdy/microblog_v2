import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getOnePostFromApi } from './actionCreators'

function Post(){
  const dispatch = useDispatch();
  const id = Number(useParams().id);
  console.log("id", id);
  console.log("id", typeof id);
  const post = useSelector((st) => st.posts[id]);
  console.log(post);

  const state = useSelector((st) => st);
  console.log('current state', state);


  useEffect(() => {
    console.log("useEffect")
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
          <p>Comments</p>
          <p>Comments</p>
          <p>Comments</p>
          <p>Comments</p>
          <p>Comments</p>
        </>
      :
      <p>Nope</p>}
    </div>
  )
};

export default Post;