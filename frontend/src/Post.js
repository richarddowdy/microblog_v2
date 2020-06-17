import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Post(){
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const post = useSelector((st) => st.posts.find(post => post.id === Number(id)));


  // useEffect(() => {
  //   async function fetchPost(){
  //     dispatch(getOnePostFromApi());
  //   }
  //   if(!post){
  //     fetchPost();
  //   }
  // }, [post, id, dispatch])

  return (
    <div className="col-8">
      {/* <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>{post.body}</p>
      <hr/> */}
      <h1>Comments Container</h1>
      <p>Comments</p>
      <p>Comments</p>
      <p>Comments</p>
      <p>Comments</p>
      <p>Comments</p>
    </div>
  )
};

export default Post;