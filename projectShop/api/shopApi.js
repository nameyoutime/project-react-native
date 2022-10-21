import axiosClient from "./axiosClient";
import axios from 'axios';

const productApi = {

    // getAll: (params) => {
    //     const url = '/todos';
    //     return axiosClient.get(url, { params });
    // },

    test: async (params)  => {
        const url = '/test';
        // console.log(axiosClient.get(url))
        // let re =await axios.get('http://192.168.102.4:8080/api/test')
        return axiosClient.get(url, { params });
    }


}
export default productApi;