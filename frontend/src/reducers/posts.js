import { 
  ADD_POST, 
  FETCH_POST,
  ADD_COMMENT,
  // LOAD_POSTS,
  // REMOVE_POST,
  // LOAD_POST,
  // EDIT_POST
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
  switch(action.type){

    case ADD_POST:
      return {
        ...state,
        [action.post.id]: { ...action.post, comments: [] },
      };

    case FETCH_POST:
      return {
        ...state,
        [action.post.id]: {...action.post}
      }

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

    default:
      console.warn('No type found', action.type);
      return state;
  }
}

export default postsReducer;