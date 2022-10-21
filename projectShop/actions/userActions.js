export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const VIEWALL_USER = 'VIEWALL_USER';
export const GET_ALL_USER = 'GET_ALL_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';


export const getAllUser = (users) => {
    return {
        type: GET_ALL_USER,
        payload: users
    };
}
export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
}



export const createUser = (user) => {
    return {
        type: CREATE_USER,
        payload: {
            userId: user.id,
            userName: user.name
        }
    };
}

export const viewAllUser = (user) => {
    return {
        type: VIEWALL_USER,
        payload: {
            userId: user.id,
            userName: user.name
        }
    };
}