import Types from '../actions/actionTypes';

const initialState = {
  data: [],
  sendStatus: {}
};

const report = (state = initialState, action) => {
  switch (action.type) {
    case Types.REPORT_SENT_SUCCESS:
      return Object.assign({}, state, {
        sendStatus: action.payload
      });

    case Types.REPORT_SENT_FAILURE:
      return Object.assign({}, state, {
        sendStatus: { error: action.payload }
      });

    default:
      return state;
  }
};

export default report;