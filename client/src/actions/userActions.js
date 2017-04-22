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