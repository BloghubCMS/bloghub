import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import app from './modules/app/app';
import posts from './modules/posts/posts';
import post from './modules/post/post';
import sites from './modules/sites/sites';

const rootReducer = combineReducers({
  reduxAsyncConnect,
  app,
  post,
  posts,
  sites,
});

export default rootReducer;
