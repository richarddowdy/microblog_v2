import { FETCH_TITLES, ADD_POST, UP_VOTE, DOWN_VOTE, REMOVE_POST } from "../actionTypes";

const INITIAL_STATE = [];

/*
state = {
  titles: [
    {
      id: 1,
      title: "first post title",
      description: "first post description",
      votes: 1
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

function makeTitleFromPost({ id, title, description, votes }) {
  return { id, title, description, votes };
}

function sortByVotes(titles){
  return titles.sort((a,b) => b.votes - a.votes);
}

const titlesReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TITLES:
      return sortByVotes(action.titles);

    case ADD_POST:
      return sortByVotes([...state, makeTitleFromPost(action.post)]);

    case REMOVE_POST:
      return state.filter(title => title.id !== action.postId)

    case UP_VOTE:
      const post_id = action.data.postId;
      const post = state.find(post => post.id === post_id)
      return sortByVotes(state.map(title => title.id === post_id ? {...title , votes: action.data.updatedVotes} : title ));

    case DOWN_VOTE:
      const postID = action.data.postId;
      return sortByVotes(state.map(title => title.id === postID ? {...title, votes: action.data.updatedVotes } : title));
      

    default:
      return state;
  }
};

export default titlesReducers;
