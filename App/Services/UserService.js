
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

export function getRequirements(uid, token = '') {
    return get(`${API.API_ROOT}${API.USER_REQUIREMENTS}/${uid}`, {}, {
        Authorization: 'token ' + token,
    })
}

export function getJudgements(uid, token = '') {
    return get(`${API.API_ROOT}${API.USER_JUDGEMENTS}/${uid}`, {}, {
        Authorization: 'token ' + token,
    })
}

export function changeAvatar(newAvatar, token) {
    return put(`${API.API_ROOT}${API.USER_AVATAR}`, {
        userfileId: newAvatar,
    }, {
        Authorization: 'token ' + token,
    })
}
