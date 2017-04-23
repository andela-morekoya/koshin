import { combineReducers } from 'redux';
import user from './userReducer';
import allRepos from './repoReducers';
import watchedRepos from './watchedRepoReducer';

const rootReducer = combineReducers({
  user,
  allRepos,
  watchedRepos
});

export default rootReducer;