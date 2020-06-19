import {
  ADD_POST,
  FETCH_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  REMOVE_POST,
  EDIT_POST,
  // LOAD_POSTS,
  // LOAD_POST,
} from '../actionTypes';

const INITIAL_STATE = {};

/*
state = {
  titles: [
    {
      id: 1,
      title: "first post title",
      description: "first post description",
    },
    {...},
    {...},
  ]
  posts: {
    1: {
      id: 1 // can be used as map-key since this is unique
      title: "first post title",
      description: "first post description",
      body: "first post body",
      comments: [ {
          id: 1 // SERIAL map-key,
          post: 1 ,
          text: "first post comment",
        },
        {...},
        {...}
      ]
    }
    2: {...}
    3: {...}
    ...
  }
}
**/


const postsReducer = (state = INITIAL_STATE, action) => {
  // let postId = state[action.commentObj.postId]; // TODO possible refactor later
  // console.log(postId)
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

    case ADD_COMMENT:
      const { postId, id, text } = action.commentObj
      return {
        ...state,
        [postId]: {
          ...state[postId],
          comments: [
            ...state[postId].comments,
            { id, text }
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

    default:
      console.warn('No type found', action.type);
      return state;
  }
}

export default postsReducer;