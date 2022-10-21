// import axiosClient from "./axiosClient";
import axios from 'axios';
const mainUrl = 'http://192.168.102.4:8080/api/order';

const orderApi = {
    getAll: () => {
        const url = `${mainUrl}/`;
        return axios.get(url);
    },
    create: (params) => {
        const url = `${mainUrl}/`;
        return axios.post(url, params);
    },
    get: (userId) => {
        const url = `${mainUrl}/${userId}`;
        return axios.get(url);
    }
    // create: (params, images) => {
    //     console.log(params)
    //     const url = `${mainUrl}/`;
    //     return axios.post(url, params);
    // },
    // update: (params) => {
    //     const url = `${mainUrl}/${params._id}`;
    //     return axios.put(url, { product: params });
    // }
    // ,
    // delete: (id) => {
    //     const url = `${mainUrl}/${id}`;
    //     return axios.delete(url);
    // },
    // search(keyword) {
    //     const url = `${mainUrl}/search?keyword=${keyword}`;
    //     return axios.get(url);
    // },


}
export default orderApi;