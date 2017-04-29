import Types from '../actions/actionTypes';

const initialState = {
  personalRepos: {
    data: [],
    isFetching: false
  },
  orgRepos: {
    data: [],
    isFetching: false
  }
};

const allRepos = (state = initialState, action) => {
  const personalRepos = state.personalRepos;
  const orgRepos = state.orgRepos;

  switch (action.type) {
    case Types.FETCH_PERSONAL_REPOS_RESPONSE:
      return Object.assign({}, state, {
        personalRepos: {
          data: action.payload,
          isFetching: false
        }
      });

    case Types.FETCH_ORG_REPOS_RESPONSE:
      orgRepos.data = action.payload;
      orgRepos.isFetching = false;
      return Object.assign({}, state, {
        orgRepos
      });

    case Types.REQUEST_PERSONAL_REPOS:
      return Object.assign({}, state, {
        personalRepos: { isFetching: true }
      });

    case Types.REQUEST_ORG_REPOS:
      orgRepos.isFetching = true;
      return Object.assign({}, state, {
        orgRepos
      });

    case Types.RECEIVE_REPO_FAILURE:
      return state;

    case Types.ADD_REPO_FAILURE:
      return state;

    default:
      return state;
  }
};

export default allRepos;
