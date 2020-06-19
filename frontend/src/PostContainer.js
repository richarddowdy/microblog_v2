import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getOnePostFromApi, removePostFromApi, addCommentToApi, removeCommentFromApi } from './actionCreators'
import PostDetails from './PostDetails';
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

  function removePost(postId){
    dispatch(removePostFromApi(postId))
  }

  function addComment({ postId, text }){
    dispatch(addCommentToApi({ postId, text }));
  }

  function removeComment(comment){
    dispatch(removeCommentFromApi(comment))
  }


  
  return (
    <div className="col-8">
      { post !== undefined ?
        <>
          <PostDetails remove={removePost} post={post}/>
          {/* <h1>{post.title}</h1>
          <p>{post.description}</p>
          <p>{post.body}</p> */}
          <hr/>
          <h1>Comments Container</h1>
          <CommentsForm addComment={addComment} postId={postId}/>
          <CommentsList remove={removeComment} comments={post.comments} postId={postId}/>
        </>
      :
      <p>Nope</p>}
    </div>
  )
};

export default PostContainer;