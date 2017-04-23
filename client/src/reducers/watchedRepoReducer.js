import Types from '../actions/actionTypes';

const initialState = {
  data: [],
  isFetching: false
};

const watchedRepos = (state = initialState, action) => {
  switch (action.type) {
    case Types.REQUEST_USER_REPOS:
      return Object.assign(
        {},
        state,
        { isFetching: true }
      );
    
    case Types.FETCH_USER_REPO_RESPONSE:
      return Object.assign(
        {}, 
        state, 
        { isFetching: false, data: action.payload }
      );

    default:
      return state;
  }
};

export default watchedRepos;