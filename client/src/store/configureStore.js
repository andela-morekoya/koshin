import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reactImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const initialState = {
};

export default createStore(rootReducer, initialState);