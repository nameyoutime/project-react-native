export const CREATE_TAG = 'CREATE_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const VIEWALL_TAG = 'VIEWALL_TAG';


export const createTag = (tag) => {
    return {
        type: CREATE_TAG,
        test:'test',
        payload: {
            tagId: tag.id,
            tagName: tag.name
        }
    };
}

export const updateTag = (tag) => {

    return {
        type: UPDATE_TAG,
        payload: {
            tagId: tag.id,
            tagName: tag.name
        }
    };
}


export const deleteTag = (tag) => {
    return {
        type: DELETE_TAG,
        payload: {
            tagId: parseInt(tag.id)
        }
    };
}

export const viewAllTag = (tag) => {
    return {
        type: VIEWALL_TAG,
        payload: {
            tagId: tag.id,
            tagName: tag.name
        }
    };
}