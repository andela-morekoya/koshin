import Types from '../actions/actionTypes';

const initialState = {
  data: [],
  isFetching: false
};

const emails = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_USER_EMAILS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case Types.FETCH_USER_EMAILS_RESPONSE:
      return Object.assign({}, state, {
        data: action.payload,
        isFetching: false
      });

    case Types.FETCH_USER_EMAILS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    
    default:
      return state;
  }
};

export default emails;