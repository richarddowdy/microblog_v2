import { ADD_POST, REMOVE_POST, ADD_COMMENT, DELETE_COMMENT, LOAD_POSTS, LOAD_POST, EDIT_POST} from '../actionTypes';

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
    case LOAD_POSTS:
      return {
        ...state, posts: {...action.posts}
      }

    default:
      console.warn('No type found', action.type);
      return state;
  }
}

export default postsReducer;