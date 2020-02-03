import axios, {AxiosResponse} from 'axios'
import {ISettings} from "../models/Settings";

axios.defaults.baseURL = 'http://localhost:5000/api';

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

export default {
    Settings
}
