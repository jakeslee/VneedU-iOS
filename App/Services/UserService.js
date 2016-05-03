
import API from '../Constants/API';
import { post, get } from './NetworkService';

export function login(username, password) {
    return post(`${API.API_ROOT}${API.LOGIN}`, {
        phone: username,
        password: password,
    });
}

export function signup(params = {}) {
    return post(`${API.API_ROOT}${API.REGIST_USER}`, params);
}

export function getUser(token = '', uid) {
    let uid_str = uid ? '/uid' : '';
    return get(`${API.API_ROOT}${API.REGIST_USER}${uid_str}`, {}, {
        Authorization: 'token ' + token,
    });
}
