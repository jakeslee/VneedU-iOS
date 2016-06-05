import API from '../Constants/API';
import { post, get, put } from './NetworkService';

export function add_order(rid, token = '') {
    return post(`${API.API_ROOT}${API.ORDER}`, {
        rid,
    }, {
        Authorization: 'token ' + token,
    });
}

export function get_order(oid, token = '', { exclude, expand } = {exclude: '', expand: ''}) {
    return get(`${API.API_ROOT}${API.ORDER}/${oid}`, {
        exclude,
        expand,
    },{
        Authorization: 'token ' + token,
    });
}

export function get_orders(uid, token = '', page = 1, { exclude, expand } = {exclude: '', expand: ''}) {
    return get(`${API.API_ROOT}${API.ORDERS}/${uid}`, {
        page,
        exclude,
        expand,
    },{
        Authorization: 'token ' + token,
    });
}

/*
 * 创建订单
 */
export function create_order(rid, token) {
    return post(`${API.API_ROOT}${API.ORDER}`, {
        rid,
    },{
        Authorization: 'token ' + token,
    });
}

export function cancel_order(oid, token) {
    return put(`${API.API_ROOT}${API.ORDER_CANCEL}/${oid}`, {}, {
        Authorization: 'token ' + token,
    });
}

export function check_order(oid, token) {
    return put(`${API.API_ROOT}${API.ORDER_CHECK}/${oid}`, {}, {
        Authorization: 'token ' + token,
    });
}

export function finished_order(oid, token) {
    return put(`${API.API_ROOT}${API.ORDER_FINISHED}/${oid}`, {}, {
        Authorization: 'token ' + token,
    });
}

export function judge_order(oid, content, score, token) {
    return post(`${API.API_ROOT}${API.ORDER_JUDGEMENT}/${oid}`, {
        content,
        score,
    }, {
        Authorization: 'token ' + token,
    });
}
