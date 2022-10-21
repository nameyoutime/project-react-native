import { SET_CURRENT_USER, GET_ALL_USER, CREATE_USER, DELETE_USER, UPDATE_USER, VIEWALL_USER, } from '../actions/userActions.js';


const initialState = {
    users: [

    ],
    currentUser: {}
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case GET_ALL_USER:
            return {
                ...state,
                users: [...state.users, ...action.payload]
            };
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, { id: action.payload.userId, name: action.payload.userName }]
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.userId ? { id: action.payload.userId, name: action.payload.user } : user)
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.userId)
            };
        case VIEWALL_USER:
            return {
                ...state,
                currentUsers: action.payload
            };
        default:
            return { ...state };
    }
}

export default userReducer;