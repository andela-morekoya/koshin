import Types from '../actions/actionTypes';

const initialState = {
  data: {
    github: {},
    local: {}
  },
  isFetching: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_USER_RESPONSE:
      return Object.assign({}, state, {
        data: action.payload,
        isFetching: false
      });

    case Types.REQUEST_USER_DETAILS:
      return Object.assign({},
        state,
        { isFetching: true }
      );
    case Types.RECEIVE_USER_DETAILS_FAILURE:
      return state;

    default:
      return state;
  }
};

export default user;