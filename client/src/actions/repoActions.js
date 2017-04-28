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

export function fetchPersonalReposRequest() {
  return createAction(Types.REQUEST_PERSONAL_REPOS)();
}

export function fetchOrgReposRequest() {
  return createAction(Types.REQUEST_ORG_REPOS)();
}

export function fetchPersonalReposResponse(data) {
  return createAction(Types.FETCH_PERSONAL_REPOS_RESPONSE)(data);
}

function fetchRepoBranch(full_name, token) {
  return api.githubFetch(`/repos/${full_name}/branches?`, token);
}

function getBranches(data, dispatch) {
  return dispatch(
    fetchPersonalReposResponse(data.map(repo => {
      fetchRepoBranch(repo.full_name, 'daacd3f6a84071c44a0c4625c61469a8133d8bea')
        .then(branches => {
          repo.branches = branches;
        });
      return repo;
    }))
  );
}

export function fetchPersonalRepos(name) {
  return dispatch => {
    dispatch(fetchPersonalReposRequest());
    return api.githubFetch(`/users/${name}/repos?`, 'daacd3f6a84071c44a0c4625c61469a8133d8bea')
      .then(data => getBranches(data, dispatch))
      .catch(err => dispatch(fetchRepoFailure(err.message)));
  };
}


export function AddRepoFailure(message) {
  return createAction(Types.ADD_REPO_FAILURE)(message);
}

export function addToWatchedRepo(body) {
  return dispatch => {
    return api.postEndpoint(`/api/v1/user/${body.userId}/repos`, body)
      .then(data => dispatch(fetchUserRepos(body.userId)))
      .catch(err => dispatch(AddRepoFailure(err.message)));
  };
}

function getOrgRepoBranches(data, dispatch, token) {
  return dispatch(
    fetchOrgReposResponse(data.map(repo => {
      fetchRepoBranch(repo.full_name, token)
        .then(branches => {
          repo.branches = branches;
        });
      return repo;
    }))
  );
}

export function fetchOrgRepos(name,token, privateRepo) {
  return dispatch => {
    let url = `/orgs/${name}/repos?per_page=100`;
    if (privateRepo) {
      url += '&type=private';
    }
    dispatch(fetchOrgReposRequest());
    return api.githubFetch(url, token)
      .then(data => getOrgRepoBranches(data, dispatch, token))
      .catch(err => dispatch(fetchRepoFailure(err.message)));
  };
}

export function fetchOrgReposResponse(data) {
  return createAction(Types.FETCH_ORG_REPOS_RESPONSE)(data);
}