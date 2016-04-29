
import API from '../Constants/API';
import { post } from './NetworkService';

export function login(username, password) {
    return post(`${API.API_ROOT}${API.LOGIN}`, {
        phone: username,
        password: password,
    });
}

export function signup(params = {}) {
    return post(`${API.API_ROOT}${API.REGIST_USER}`, params);
}

export function getUser(uid) {
    
}
