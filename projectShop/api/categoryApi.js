// import axiosClient from "./axiosClient";
import axios from 'axios';
import config from '../config';
const mainUrl = `http://${config.HOST}:${config.PORT}/api/category`;

const categoryApi = {
    getAll: (params) => {
        const url = `${mainUrl}/`;
        return axios.get(url);
    },
    create: (params) => {
        const url = `${mainUrl}/`;
        return axios.post(url, params);
    },
    update: (params) => {
        const url = `${mainUrl}/${params._id}`;
        return axios.put(url, params);
    }
    ,
    delete: (id) => {
        const url = `${mainUrl}/${id}`;
        return axios.delete(url);
    },


}
export default categoryApi;