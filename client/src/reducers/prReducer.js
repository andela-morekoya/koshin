import Types from '../actions/actionTypes';

const initialState = {
  data: [],
  isGenerating: false
};

const repoRPs = (state = initialState, action) => {
  switch (action.type) {
    case Types.START_REPORT_BUILD:
      return Object.assign({}, state, {
        isGenerating: true
      });

    case Types.FETCH_PRs_RESPONSE:
      return Object.assign({}, state, {
        data: action.payload,
        isGenerating: false
      });

    case Types.FETCH_PRs_FAILURE:
      return state;

    default:
      return state;
  }
}

export default repoRPs;