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
        // case UPDATE_CATE:
        //     console.log({
        //         products: state.products.map((item) => {
        //             if (item._id == action.payload._id) {
        //                 return action.payload;
        //             } else {
        //                 return item;
        //             }
        //         })
        //     })
        //     return {
        //         products: state.products.map((item) => {
        //             if (item._id == action.payload._id) {
        //                 return action.payload;
        //             } else {
        //                 return item;
        //             }
        //         })
        //     }
        case DELETE_PRODUCT:
            // console.log(console.log(action.payload))
            return {
                products: [...state.products.filter((c) => (c._id != action.payload.id))]
            };

        // case DELETE_CATE:
        //     console.log({
        //         products: state.products.filter((item) => item._id != action.payload._id)
        //     })
        //     return {
        //         products: state.products.filter((item) => item._id != action.payload._id)
        //     }

        default:
            return { ...state };
    }
}

export default cateReducer;