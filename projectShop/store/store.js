import { createStore, combineReducers } from 'redux';
import TagReducer from '../reducers/tagReducer.js';
import UserReducer from '../reducers/userReducer.js';

const rootReducer = combineReducers({
    tag: TagReducer,
    user: UserReducer
});

export const Store = createStore(rootReducer);