import { combineReducers } from 'redux';
import user from './userReducer';
import watchedRepos from './watchedRepoReducer';

const rootReducer = combineReducers({
  user,
  watchedRepos
});

export default rootReducer;