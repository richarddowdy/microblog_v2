import posts from './posts';
import titles from './titles';
import user from './user';
import errors from './errors';
import { combineReducers } from 'redux';

export default combineReducers({
 posts,
 titles,
 user,
 errors,
});