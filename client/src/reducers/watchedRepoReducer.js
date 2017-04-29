import Types from '../actions/actionTypes';

const initialState = {
  data: [],
  isFetching: false
};

const watchedRepos = (state = initialState, action) => {
  switch (action.type) {
    case Types.REQUEST_WATCHED_REPOS:
      return Object.assign(
        {},
        state,
        { isFetching: true }
      );
    
    case Types.FETCH_WATCHED_REPO_RESPONSE:
      return Object.assign(
        {}, 
        state, 
        { isFetching: false, data: action.payload }
      );

    case Types.SEND_REPO_INFO:
        return Object.assign(
          {}, state, {
            isSending: true
          }
        );
 
    case Types.UPDATE_REPO_INFO:
      return Object.assign(
        {}, state, {
          isSending: false,
          repoInfo: action.payload
        }
      );

    default:
      return state;
  }
};

export default watchedRepos;