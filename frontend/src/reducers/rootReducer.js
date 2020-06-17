import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import titlesReducer from './titlesReducer';
// import commentsReducer from './commentsReducer';

export default combineReducers({
 postsReducer,
 titlesReducer,
//  commentsReducer,
});