
import API from '../Constants/API';
import { post, get, put } from './NetworkService';

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
    let uid_str = uid ? '/' + uid : '';
    return get(`${API.API_ROOT}${API.REGIST_USER}${uid_str}`, {}, {
        Authorization: 'token ' + token,
    });
}

export function set_profile(token = '', params = {}) {
    return put(`${API.API_ROOT}${API.REGIST_USER}`, params, {
        Authorization: 'token ' + token,
    });
}

export function reset_password(password, token = '') {
    return put(`${API.API_ROOT}${API.PASSWORD}`, {
        password,
    }, {
        Authorization: 'token ' + token,
    })
}
