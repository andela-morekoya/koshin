import Types from './actionTypes';
import { createAction } from 'redux-actions';
import * as api from '../utils/api';
import apiPaths from '../utils/apiPaths';

export function fetchUserRequest() {
  return createAction(Types.REQUEST_USER_DETAILS)();
}

export function fetchUserDetailsFailure(error) {
  return createAction(Types.RECEIVE_USER_DETAILS_FAILURE)(error);
}

export function fetchUserResponse(data) {
  return createAction(Types.FETCH_USER_RESPONSE)(data);
}

export function fetchUser() {
  return dispatch => {
    dispatch(fetchUserRequest());
    return api.callEndpoint(apiPaths.LOGIN_PATH)
      .then(data => dispatch(fetchUserResponse(data)))
      .catch(err => dispatch(fetchUserDetailsFailure(err.message)));
  };
}

export function fetchReposRequest() {
  return createAction(Types.REQUEST_REPOS)();
}

export function fetchReposResponse(data) {
  return createAction(Types.FETCH_REPOS_RESPONSE)(data);
}

export function fetchRepoFailure(error) {
  return createAction(Types.RECEIVE_REPO_FAILURE)(error);
}

function fetchRepoBranch(full_name) {
  return api.githubFetch(`/repos/${full_name}/branches`)
    .then(data => data);
}

function getB(data, dispatch) {
  return dispatch(
    fetchReposResponse(data.map(repo => {
      fetchRepoBranch(repo.full_name)
        .then(branches => {
          repo.branches = branches;
        });
      return repo;
    }))
  );
}

export function fetchRepos(name) {
  return dispatch => {
    dispatch(fetchReposRequest());
    return api.githubFetch(`/users/${name}/repos`)
      .then(data => getB(data, dispatch))
      .catch(err => dispatch(fetchRepoFailure(err.message)));
  };
}