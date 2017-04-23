import Types from '../actions/actionTypes';

const initialState = {
  data: [],
  isFetching: false
};

const allRepos = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_REPOS_RESPONSE:
      return Object.assign({}, state, {
        data: action.payload,
        isFetching: false
      });

    case Types.REQUEST_REPOS:
      return Object.assign({},
        state,
        { isFetching: true }
      );

    case Types.RECEIVE_REPO_FAILURE:
      return state;

    case Types.ADD_REPO_FAILURE:
      return state;

    default:
      return state;
  }
};

export default allRepos;