import { combineReducers } from 'redux';
import user from './userReducer';
import allRepos from './repoReducers';

const rootReducer = combineReducers({
  user,
  allRepos
});

export default rootReducer;