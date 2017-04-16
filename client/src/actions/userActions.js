import types from './actionTypes';

export const receiveUserDetailsSuccess = (userData) => {
    return {type: types.RECEIVE_USER_DETAILS_SUCCESS, userData };
};

export const receiveUserDetailsFailure = (error) => {
    return {type: types.RECEIVE_USER_DETAILS_FAILURE, error: new Error(error) };
};