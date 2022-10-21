export const SET_ALL_PRODUCT = 'SET_ALL_PRODUCT';
export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';


export const updatedProduct = (product) => {
    return {
        type: UPDATE_PRODUCT,
        payload: product
    };
}



export const setAllProduct = (products) => {
    return {
        type: SET_ALL_PRODUCT,
        payload: products
    };
}
export const createNewProduct = (product) => {
    return {
        type: CREATE_NEW_PRODUCT,
        payload: product
    };
}
export const deleteProduct = (product) => {
    console.log(product)
    return {
        type: DELETE_PRODUCT,
        payload: {
            id: product.id,
        }
    };
}