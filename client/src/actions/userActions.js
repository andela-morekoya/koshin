import Types from './actionTypes';
import { createAction } from 'redux-actions';
import * as api from '../utils/api';
import apiPaths from '../utils/apiPaths';
import { fetchUserRepos, fetchRepoFailure } from './repoActions';
import Toastr from 'toastr';

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

export function updateUserDetails(user) {
  return dispatch => {
    return api.githubFetch(`/orgs/${user.organisations}/repos?`, user.personalAccessToken)
      .then(data => {
        if (data.length) {
          return api.updateEndPoint(`${apiPaths.USER_EP}/${user.id}`, user)
            .then((updatedUser) => {
              Toastr.success(`${user.organisations} has been added`);
              return dispatch(fetchUserResponse(updatedUser));
            })
            .catch(err => dispatch(fetchUserDetailsFailure(err.message)));
        }
      }).catch(err => {
        Toastr.error(`Organisation not found or You don't have access`);
        return dispatch(fetchRepoFailure(err.message));
      });
  };
}