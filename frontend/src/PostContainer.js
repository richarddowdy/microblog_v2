import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getOnePostFromApi, addCommentToApi, removeCommentFromApi } from './actionCreators'
import CommentsForm from './CommentsForm';
import CommentsList from './CommentsList';

function PostContainer(){
  const dispatch = useDispatch();
  const postId = Number(useParams().id);
  const post = useSelector((st) => st.posts[postId]);

  
  const state = useSelector((st) => st);
  
  useEffect(() => {
    async function fetchPost(){
      dispatch(getOnePostFromApi(postId));
    }
    if(!post){
      fetchPost();
    }
  }, [post, postId, dispatch])

  function addComment({ postId, text }){
    dispatch(addCommentToApi({ postId, text }));
  }

  function remove(data){
    dispatch(removeCommentFromApi(data))
  }
  
  return (
    <div className="col-8">
      { post !== undefined ?
        <>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p>{post.body}</p>
          <hr/>
          <h1>Comments Container</h1>
          <CommentsForm addComment={addComment} postId={postId}/>
          <CommentsList remove={remove} comments={post.comments} postId={postId}/>
          {/* <CommentsContainer /> */}
        </>
      :
      <p>Nope</p>}
    </div>
  )
};

export default PostContainer;