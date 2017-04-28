import { combineReducers } from 'redux';
import user from './userReducer';
import allRepos from './repoReducers';
import watchedRepos from './watchedRepoReducer';
import repoRPs from './prReducer';
import report from './reportReducer';
import emails from './emailReducer';

const rootReducer = combineReducers({
  user,
  allRepos,
  watchedRepos,
  repoRPs,
  report,
  emails
});

export default rootReducer;