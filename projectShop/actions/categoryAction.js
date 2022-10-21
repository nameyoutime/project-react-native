export const SET_ALL_CATE = 'SET_ALL_CATE';
export const CREATE_NEW_CATE = 'CREATE_NEW_CATE';
export const DELETE_CATE = 'DELETE_CATE';
export const UPDATE_CATE = 'UPDATE_CATE';


export const updateCate = (cate) => {
    return {
        type: UPDATE_CATE,
        payload: cate
    };
}



export const setAllCate = (cates) => {
    return {
        type: SET_ALL_CATE,
        payload: cates
    };
}
export const createNewCate = (cate) => {
    return {
        type: CREATE_NEW_CATE,
        payload: {
            _id: cate._id,
            title: cate.title,
            description: cate.description
        }
    };
}
export const deleteCate = (cate) => {
    return {
        type: DELETE_CATE,
        payload: {
            _id: cate._id,
        }
    };
}