// import axiosClient from "./axiosClient";
import axios from 'axios';
import config from '../config';
const mainUrl = `http://${config.HOST}:${config.PORT}/api/user`;

const userApi = {
    login: (params) => {
        const url = mainUrl + '/login';

        return axios.post(url, params);
    },
    register: (params) => {
        const url = mainUrl + '/register';
        return axios.post(url, params);
    },
    getAll: (params) => {
        const url = '/';
        return axios.get(url, { params });
    },
    getUser: (params) => {
        const url = mainUrl + '/id/' + params;
        return axios.get(url, params);
    },
    updateProfile: (params) => {
        const url = mainUrl + '/update/profile?id='+ params._id;
        console.log(url);
        return axios.put(url, params);
    },

}
export default userApi;