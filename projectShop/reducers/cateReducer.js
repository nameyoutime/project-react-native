import { SET_ALL_CATE, CREATE_NEW_CATE, DELETE_CATE, UPDATE_CATE } from '../actions/categoryAction.js';


const initialState = {
    categories: []
};
const cateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_CATE:
            
            return {
                categories: action.payload
            }
        case CREATE_NEW_CATE:
            
            return {
                categories: [...state.categories, action.payload]
            }
        case UPDATE_CATE:
            
            return {
                categories: state.categories.map((item) => {
                    if (item._id == action.payload._id) {
                        return action.payload;
                    } else {
                        return item;
                    }
                })
            }


        case DELETE_CATE:
            
            return {
                categories: state.categories.filter((item) => item._id != action.payload._id)
            }

        default:
            return { ...state };
    }
}

export default cateReducer;