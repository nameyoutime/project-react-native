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
    // login: (params) => {
    //     const url = mainUrl + '/login';

    //     return axios.post(url, params);
    // },
    // register: (params) => {
    //     const url = mainUrl + '/register';
    //     return axios.post(url, params);
    // },
    // getAll: (params) => {
    //     const url = '/';
    //     return axios.get(url, { params });
    // },
    // getUser: (params) => {
    //     const url = mainUrl + '/id/' + params;
    //     return axios.get(url, params);
    // },
    // updateProfile: (params) => {
    //     const url = mainUrl + '/update/profile?id='+ params._id;
    //     console.log(url);
    //     return axios.put(url, params);
    // },
    // // getAll: (params) => {
    // //     const url = '/todos';
    // //     return axiosClient.get(url, { params });
    // // },

    test: () => {
        const url = '/test';
        return axios.get(url);
    }


}
export default categoryApi;