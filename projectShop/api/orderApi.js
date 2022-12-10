// import axiosClient from "./axiosClient";
import axios from 'axios';
import config from '../config';
const mainUrl = `http://${config.HOST}:${config.PORT}/api/order`;

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


}
export default orderApi;