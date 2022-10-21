// import axiosClient from "./axiosClient";
import axios from 'axios';
const mainUrl = 'http://192.168.102.4:8080/api/user';

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
    // getAll: (params) => {
    //     const url = '/todos';
    //     return axiosClient.get(url, { params });
    // },

    test: () => {
        const url = '/test';
        return axios.get(url);
    }


}
export default userApi;