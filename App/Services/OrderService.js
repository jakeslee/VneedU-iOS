import API from '../Constants/API';
import { post, get, put } from './NetworkService';

export function add_order(rid, token = '') {
    return post(`${API.API_ROOT}${API.ORDER}`, {
        rid,
    }, {
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
