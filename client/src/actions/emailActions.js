import Types from './actionTypes';
import { createAction } from 'redux-actions';
import * as api from '../utils/api';
import apiPaths from '../utils/apiPaths';

function fetchUserEmailsRequest() {
  return createAction(Types.FETCH_USER_EMAILS_REQUEST)();
}

function fetchUserEmailsResponse(data) {
  return createAction(Types.FETCH_USER_EMAILS_RESPONSE)(data);
}

function fetchUserEmailsFailure(message) {
  return createAction(Types.FETCH_USER_EMAILS_FAILURE)(message);
}

export function fetchUserEmails(userId) {
  return dispatch => {
    dispatch(fetchUserEmailsRequest());
    return api.callEndpoint(`${apiPaths.USER_EP}/${userId}/emails`)
      .then(data => dispatch(fetchUserEmailsResponse(data)))
      .catch(err => dispatch(fetchUserEmailsFailure(err.message)));
  };
}

export function addEmails(data) {
  return dispatch => {
    return api.postEndpoint(`${apiPaths.USER_EP}/${data.userId}/emails`, data)
      .then(data => dispatch(fetchUserEmails(data.userId)))
      .catch(err => dispatch(fetchUserEmailsFailure(err.message)));
  };
}