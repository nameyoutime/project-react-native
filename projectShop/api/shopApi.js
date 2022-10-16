import axiosClient from "./axiosClient";

const productApi = {

    // getAll: (params) => {
    //     const url = '/todos';
    //     return axiosClient.get(url, { params });
    // },
    test: ()  => {
        const url = '/test';
        return axiosClient.get(url);
    }


}
export default productApi;