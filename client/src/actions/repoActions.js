import Types from './actionTypes';
import { createAction } from 'redux-actions';
import Toastr from 'toastr';
import * as api from '../utils/api';
import apiPaths from '../utils/apiPaths';
import store from '../store/configureStore';

export function fetchPersonalRepos(name, token) {
    return dispatch => {
        dispatch(fetchPersonalReposRequest());
        return api.githubFetch(`/users/${name}/repos?`, token)
            .then(personalRepos => {
                return api.callEndpoint(`${apiPaths.USER_EP}/${personalRepos[0].owner.id}${apiPaths.REPOS_EP}`)
                    .then(watchedRepos => {
                        const data = [];
                        personalRepos.map(pRepo => {
                            let found = false;
                            watchedRepos.map(wRepo => {
                                wRepo.url === pRepo.url ? found = true : null;
                            });
                            found ? null : data.push(pRepo);
                        });
                        return getBranches(data, dispatch, token);
                    });
            })
            .catch(err => dispatch(fetchRepoFailure(err.message)));
    };
}

function updatePersonalRepos(name, token, newRepo, dispatch) {
    return api.githubFetch(`/users/${name}/repos?`, token)
        .then(data => {
            const repoList = data.filter(repo => repo.url !== newRepo.url);
            getBranches(repoList, dispatch, token);
        }).catch(err => dispatch(fetchRepoFailure(err.message)));
}

function getBranches(data, dispatch, token) {
    return dispatch(
        fetchPersonalReposResponse(data.map(repo => {
            fetchRepoBranch(repo.full_name, token)
                .then(branches => {
                    repo.branches = branches;
                });
            return repo;
        }))
    );
}

export function fetchOrgRepos(name, token) {
    return dispatch => {
        dispatch(fetchOrgReposRequest());
        return api.githubFetch(`/orgs/${name}/repos?type=private&`, token)
            .then(orgRepos => {
                return api.callEndpoint(`${apiPaths.USER_EP}/${store.getState().user.data.github.id}${apiPaths.REPOS_EP}`)
                    .then(watchedRepos => {
                        const data = [];
                        orgRepos.map(oRepo => {
                            let found = false;
                            watchedRepos.map(wRepo => {
                                wRepo.url === oRepo.url ? found = true : null;
                            });
                            found ? null : data.push(oRepo);
                        });
                        return getOrgRepoBranches(data, dispatch, token);
                    });
            })
            .catch(err => dispatch(fetchRepoFailure(err.message)));
    };
}

function updateOrgRepos(name, token, newRepo, dispatch) {
    return api.githubFetch(`/orgs/${name}/repos?type=private&`, token)
        .then(data => {
            const repoList = data.filter(repo => repo.url !== newRepo.url);
            getOrgRepoBranches(repoList, dispatch, token);
        }).catch(err => dispatch(fetchRepoFailure(err.message)));
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

export function addToWatchedRepo(newRepo) {
    return dispatch => {
        return api.postEndpoint(`/api/v1/user/${newRepo.userId}/repos`, newRepo)
            .then(data => {
                const OrgOrUserName = newRepo.name.split('/')[0];
                if (newRepo.isPrivate) {
                    dispatch(fetchOrgRepos(OrgOrUserName, 'f8e465c2a3ba118454605adab7b5ff5794e54ea6'));
                } else {
                    dispatch(fetchPersonalRepos(OrgOrUserName, 'f8e465c2a3ba118454605adab7b5ff5794e54ea6'));
                }
                dispatch(fetchUserRepos(newRepo.userId));

            })
            .catch(err => dispatch(AddRepoFailure(err.message)));
    };
}

export function fetchUserRepos(user_id) {
    return dispatch => {
        dispatch(fetchRepoRequest());
        return api.callEndpoint(`${apiPaths.USER_EP}/${user_id}${apiPaths.REPOS_EP}`)
            .then(data => dispatch(fetchRepoResponse(data)))
            .catch(err => dispatch(fetchRepoFailure(err.message)));
    };
}

function fetchRepoBranch(full_name, token) {
    return api.githubFetch(`/repos/${full_name}/branches?`, token);
}

export function updateRepoInfo(data) {
    return dispatch => {
        dispatch(sendRepoInfo());
        return api.updateEndPoint(`${apiPaths.USER_EP}/${data.userId}${apiPaths.REPOS_EP}/data.id`, data)
            .then(data => dispatch(editRepoInfo(data)))
            .catch(error => dispatch(fetchRepoFailure(error.message)));
    };
}

export function deleteWatchedRepo(repo) {
    return dispatch => {
        return api.deleteEndPoint(`${apiPaths.USER_EP}/${repo.userId}${apiPaths.REPOS_EP}/${repo.id}`, repo)
            .then(data => {
                const OrgOrUserName = repo.name.split('/')[0];
                if (repo.isPrivate) {
                    dispatch(fetchOrgRepos(OrgOrUserName, 'f8e465c2a3ba118454605adab7b5ff5794e54ea6'));
                } else {
                    dispatch(fetchPersonalRepos(OrgOrUserName, 'f8e465c2a3ba118454605adab7b5ff5794e54ea6'));
                }
                dispatch(fetchRepoResponse(data));
                Toastr.success(`${repo.name} has been removed from the list`);
            })
            .catch(err => dispatch(fetchRepoFailure(err.message)));
    };
}

export function fetchPersonalReposRequest() {
    return createAction(Types.REQUEST_PERSONAL_REPOS)();
}

export function fetchPersonalReposResponse(data) {
    return createAction(Types.FETCH_PERSONAL_REPOS_RESPONSE)(data);
}

export function fetchOrgReposRequest() {
    return createAction(Types.REQUEST_ORG_REPOS)();
}

export function fetchOrgReposResponse(data) {
    return createAction(Types.FETCH_ORG_REPOS_RESPONSE)(data);
}

export function fetchRepoRequest() {
    return createAction(Types.REQUEST_WATCHED_REPOS)();
}

export function fetchRepoResponse(data) {
    return createAction(Types.FETCH_WATCHED_REPO_RESPONSE)(data);
}

export function sendRepoInfo() {
    return createAction(Types.SEND_REPO_INFO)();
}

export function editRepoInfo(data) {
    return createAction(Types.UPDATE_REPO_INFO)(data);
}

export function fetchRepoFailure(error) {
    return createAction(Types.RECEIVE_REPO_FAILURE)(error);
}

export function AddRepoFailure(message) {
    return createAction(Types.ADD_REPO_FAILURE)(message);
}
