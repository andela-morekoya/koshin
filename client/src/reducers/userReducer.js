import types from '../actions/actionTypes';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case types.RECEIVE_USER_DETAILS_SUCCESS:
            return action.userData;
        case types.RECEIVE_USER_DETAILS_FAILURE:
            return action.error;
        default:
            return state;
    }
};

export default userReducer;