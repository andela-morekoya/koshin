import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reactImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default createStore(rootReducer, applyMiddleware(thunk));