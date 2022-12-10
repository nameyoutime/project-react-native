// import { SET_ALL_CATE, CREATE_NEW_CATE, DELETE_CATE, UPDATE_CATE } from '../actions/categoryAction.js';

import { CREATE_NEW_PRODUCT, SET_ALL_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "../actions/productAction";


const initialState = {
    products: null
};
const cateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PRODUCT:
            return {
                products: action.payload
            }
        case CREATE_NEW_PRODUCT:
            return {
                products: [...state.products, action.payload]
            }

        case UPDATE_PRODUCT:
            return {
                products: [...state.products.map((product, index) => {
                    if (product._id === action.payload._id) {
                        return action.payload;
                    }
                    return product;
                })]
            };
        case DELETE_PRODUCT:
            return {
                products: [...state.products.filter((c) => (c._id != action.payload.id))]
            };
        default:
            return { ...state };
    }
}

export default cateReducer;