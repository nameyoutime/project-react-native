import { CREATE_TAG, DELETE_TAG, UPDATE_TAG, VIEWALL_TAG, } from '../actions/tagActions.js';
import { combineReducers } from 'redux';
const initialState = {
    tags: [
        { id: 1, name: 'HTML' },
        { id: 2, name: 'CSS' },
        { id: 3, name: 'JavaScript' },
        { id: 4, name: 'C#' },
        { id: 5, name: 'C++' },
        { id: 6, name: 'Java' },
        { id: 7, name: 'Python' },
        { id: 8, name: 'PHP' },
        { id: 9, name: 'Ruby' },
        { id: 10, name: 'Objective C' }

    ],
    currentTag: {}
};

const tagReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TAG:
            return {
                ...state,
                tags: [...state.tags, { id: action.payload.tagId, name: action.payload.tagName }]
            };
        case UPDATE_TAG:
            return {
                ...state,
                tags: state.tags.map(tag => tag.id === action.payload.tagId ? { id: action.payload.tagId, name: action.payload.tagName } : tag)
            };
        case DELETE_TAG:
            return {
                ...state,
                tags: state.tags.filter(tag => tag.id !== action.payload.tagId)
            };
        case VIEWALL_TAG:
            return {
                ...state,
                currentTag: action.payload
            };
        default:
            return { ...state };
    }
}

export default tagReducer;