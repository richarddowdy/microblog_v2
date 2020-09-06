import {
  ADD_POST,
  FETCH_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  REMOVE_POST,
  EDIT_POST,
  UP_VOTE,
  DOWN_VOTE,
} from '../actionTypes';

const INITIAL_STATE = {};

const postsReducer = (state = INITIAL_STATE, action) => {
  // let postId = state[action.commentObj.postId]; // TODO possible refactor later
  switch (action.type) {

    case ADD_POST:
      return {
        ...state,
        [action.post.id]: { ...action.post, comments: [] },
      };

    case FETCH_POST:
      return {
        ...state,
        [action.post.id]: { ...action.post }
      }

    case EDIT_POST:
      return {
        ...state,
        [action.post.id]: {
          ...action.post,
          comments: state[action.post.id].comments
        }
      }

    case REMOVE_POST:
      let posts = { ...state };
      delete posts[action.post_id]
      return posts;

    case ADD_COMMENT:// TODO add user_id
      const { postId, id, text, author } = action.commentObj
      return {
        ...state,
        [postId]: {
          ...state[postId],
          comments: [
            ...state[postId].comments,
            { id, text, author }
          ]
        }
      }

    case DELETE_COMMENT:
      const commentId = action.commentObj.id
      const pId = action.commentObj.postId
      const filteredComments = state[pId].comments.filter((c) => c.id !== commentId)
      return {
        ...state,
        [pId]: {
          ...state[pId],
          comments: filteredComments
        }
      }

    case UP_VOTE:
      const post_id = action.data.postId
      return {
        ...state,
        [post_id]: {
          ...state[post_id],
          votes: action.data.updatedVotes
        }
      }

    case DOWN_VOTE:
      const postID = action.data.postId
      return {
        ...state,
        [postID]: {
          ...state[postID],
          votes: action.data.updatedVotes
        }
      }

    default:
      return state;
  }
}

export default postsReducer;