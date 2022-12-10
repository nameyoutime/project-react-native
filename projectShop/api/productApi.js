// import axiosClient from "./axiosClient";
import axios from 'axios';
import config from '../config';
const mainUrl = `http://${config.HOST}:${config.PORT}/api/product`;

const productApi = {
    getAll: (category, filter, limit, skip) => {
        const url = `${mainUrl}/?category=${category}&sort=${filter}&limit=${limit}&skip=${skip}`;
        return axios.get(url);
    },
    create: (params, images) => {
        console.log(params)
        const url = `${mainUrl}/`;
        return axios.post(url, params);
    },
    update: (params) => {
        const url = `${mainUrl}/${params._id}`;
        return axios.put(url, { product: params });
    }
    ,
    delete: (id) => {
        const url = `${mainUrl}/${id}`;
        return axios.delete(url);
    },
    search(keyword) {
        const url = `${mainUrl}/search?keyword=${keyword}`;
        return axios.get(url);
    },

}
export default productApi;