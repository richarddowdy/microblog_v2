import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getOnePostFromApi,
  removePostFromApi,
  updatePostToApi,
  addCommentToApi,
  removeCommentFromApi,
} from "./actionCreators";
import PostDetails from "./PostDetails";
import PostForm from "./PostForm";
import CommentsForm from "./CommentsForm";
import CommentsList from "./CommentsList";

function PostContainer() {
  let [isEditing, setIsEditing] = useState(false);
  let [emptyComment, setEmptyComment] = useState(false);

  const dispatch = useDispatch();
  const postId = Number(useParams().id);
  const post = useSelector((st) => st.posts[postId]);

  const state = useSelector((st) => st);

  useEffect(() => {
    async function fetchPost() {
      dispatch(getOnePostFromApi(postId));
    }
    if (!post) {
      fetchPost();
    }
  }, [post, postId, dispatch]);

  function removePost(postId) {
    dispatch(removePostFromApi(postId));
  }

  function addComment({ postId, text }) {
    if (!text.length) {
      return setEmptyComment(true);
    }
    dispatch(addCommentToApi({ postId, text }));
  }

  function removeComment(comment) {
    dispatch(removeCommentFromApi(comment));
  }

  function editPost({ title, description, body }) {
    dispatch(updatePostToApi({ postId, title, description, body }));
    setIsEditing(false);
  }

  function resetAlert() {
    setEmptyComment(false);
  }

  function toggleEdit() {
    setIsEditing((editing) => !editing);
  }

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="col-8 post-container mb-5">
      {isEditing ? (
        <PostForm post={post} save={editPost} cancel={toggleEdit} />
      ) : (
        <>
          <PostDetails
            remove={removePost}
            toggleEditing={toggleEdit}
            post={post}
          />
          <div className="ml-5 mt-5">
            <hr />
            <h1>Comments</h1>
            <CommentsForm
              resetAlert={resetAlert}
              addComment={addComment}
              postId={postId}
            />
            {emptyComment ? <div className="alert alert-warning">You forgot to write a comment before adding it!</div> : null}
            <CommentsList
              remove={removeComment}
              comments={post.comments}
              postId={postId}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PostContainer;
