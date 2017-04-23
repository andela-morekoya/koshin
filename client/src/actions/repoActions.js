import Types from './actionTypes';
import { createAction } from 'redux-actions';
import * as api from '../utils/api';
import apiPaths from '../utils/apiPaths';

export function fetchRepoFailure(error) {
  return createAction(Types.RECEIVE_REPO_FAILURE)(error);
}

export function fetchRepoRequest() {
  return createAction(Types.REQUEST_WATCHED_REPOS)();
}

export function fetchRepoResponse(data) {
  return createAction(Types.FETCH_WATCHED_REPO_RESPONSE)(data);
}

export function fetchUserRepos(user_id) {
  return dispatch => {
    dispatch(fetchRepoRequest());
    return api.callEndpoint(`${apiPaths.USER_EP}/${user_id}${apiPaths.REPOS_EP}`)
      .then(data => dispatch(fetchRepoResponse(data)))
      .catch(err => dispatch(fetchRepoFailure(err.message)));
  };
}