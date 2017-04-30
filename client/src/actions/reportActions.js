import Types from './actionTypes';
import { createAction } from 'redux-actions';
import * as api from '../utils/api';
import apiPaths from '../utils/apiPaths';

function reportSentFailure(error) {
  return createAction(Types.REPORT_SENT_FAILURE)(error);
}

function reportSentSuccess(message) {
  return createAction(Types.REPORT_SENT_SUCCESS)(message);
}

export function sendReportAction(content) {
  return dispatch => {
    return api.postEndpoint(`/api/v1/user/${content.userId}/report`, content)
      .then((data) => {
        if (data.err) {
          return dispatch(reportSentFailure(data.err));
        }
        return dispatch(reportSentSuccess(data));
      })
      .catch((err) => dispatch(reportSentFailure(err.message)));
  };
}