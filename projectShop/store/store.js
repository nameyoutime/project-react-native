import { createStore, combineReducers } from 'redux';
import CateReducer from '../reducers/cateReducer.js';
import UserReducer from '../reducers/userReducer.js';
import ProductReducer from '../reducers/productReducer.js';


const rootReducer = combineReducers({
    user: UserReducer,
    cate: CateReducer,
    product: ProductReducer,
});

export const Store = createStore(rootReducer);