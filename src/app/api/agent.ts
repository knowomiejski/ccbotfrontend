import axios, {AxiosResponse} from 'axios'
import {ISettings} from "../models/Settings";
import {IBot} from "../models/Bot";
import {history} from '../..';
import {toast} from "react-toastify";
import {IUser, IUserLoginFormValues} from "../models/User";

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = 'Bearer ' + token;
    return config
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('API isn\'t running')
    }
    const {status, data, config} = error.response;

    if (status === 404) {
        history.push('/notfound')
    }
    // not found for bad guid's
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound')
    }

    if (status === 401 && (data.errors !== undefined)) {
        console.warn(error.response);
        toast.error(data.errors.login);
        history.push('/')
    }

    if (status === 401 && (data.errors === undefined)) {
        console.warn(error.response);
        toast.error('Please login');
        history.push('/')
    }

    if (status === 500) {
        toast.error('Server error :(')
    }
});

const responseBody = (response: AxiosResponse) => response.data;

const sleepTime = 200;

const sleep = (ms: number) =>
    (response: AxiosResponse) =>
        new Promise<AxiosResponse>(resolve => {
                setTimeout(() => resolve(response), ms)
            }
        );

const requests = {
    get: (url: string) => axios.get(url).then(sleep(sleepTime)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(sleepTime)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(sleepTime)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(sleepTime)).then(responseBody)
};

const Settings = {
    list: (): Promise<ISettings[]> => requests.get('/settings'),
    details: (id: string) => requests.get(`/settings/${id}`),
    create: (settings: ISettings) => requests.post('/settings', settings),
    update: (settings: ISettings) => requests.put(`/settings/${settings.id}`, settings),
    delete: (id: string) => requests.del(`/settings/${id}`)
};

const Bot = {
    list: (): Promise<IBot[]> => requests.get('/bot'),
    details: (id: string) => requests.get(`/bot/${id}`),
    create: (bot: IBot) => requests.post('/bot', bot),
    update: (bot: IBot) => requests.put(`/bot/${bot.id}`, bot),
    delete: (id: string) => requests.del(`/bot/${id}`)
};

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserLoginFormValues): Promise<IUser> => requests.post(`/user/login`, user),

};

export default {
    Settings,
    Bot,
    User
}
