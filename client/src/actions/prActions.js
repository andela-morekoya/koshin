import Types from './actionTypes';
import { createAction } from 'redux-actions';
import * as api from '../utils/api';
import apiPaths from '../utils/apiPaths';

export function startReportBuild() {
  return dispatch =>
    dispatch(createAction(Types.START_REPORT_BUILD)());
}

export function fetchPRsResponse(data) {
  return createAction(Types.FETCH_PRs_RESPONSE)(data);
}

export function fetchPRsFailure(message) {
  return dispatch =>
    dispatch(createAction(Types.FETCH_PRs_FAILURE)(message));
}

export function fetchRepoPRs(repos, token) {
  return dispatch => {
    Promise.all(
      repos.map((repo) => {
        const endpoint =
          `/repos/${repo.name}/pulls?state=closed&base=${repo.defaultReportBranch}&`;
        return api.githubFetch(endpoint, token);
      })
    )
      .then(data => dispatch(fetchPRsResponse(data)))
      .catch(err => dispatch(fetchPRsFailure(err.message)));
  };
}
