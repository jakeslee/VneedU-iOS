import API from '../Constants/API';
import { post, get, put } from './NetworkService';

export function add_requirement(params, token = '') {
    return post(`${API.API_ROOT}${API.REQUIREMENT}`, params, {
        Authorization: 'token ' + token,
    });
}

export function fetch_latest_requirement(
    category = 'latest', page = 1, 
    { exclude, expand } = {exclude: '', expand: ''}) {

    return get(`${API.API_ROOT}${API.LATEST_REQUIEMENT}`, {
        category,
        page,
        exclude,
        expand,
    });
}

/*
 * 获取需求详情
 */
export function fetch_requirement_detail(id, { exclude, expand } = {exclude: '', expand: ''}) {
    return get(`${API.API_ROOT}${API.REQUIREMENT}/${id}`, {
        exclude,
        expand,
    })
}

/*
 * 获取讨论
 */
export function fetch_req_discussions(id, { exclude, expand } = {exclude: '', expand: ''}) {
    return get(`${API.API_ROOT}${API.REQUIREMENT_DISCUSSIONS}/${id}`, {
        exclude,
        expand,
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

/*
 * 赞
 */
export function race_up_req(id, token) {
    return put(`${API.API_ROOT}${API.RACE_UP}/${id}`, {},{
        Authorization: 'token ' + token,
    });
}

/*
 * 发布讨论
 */
export function post_req_discussion(rid, content, token) {
    return post(`${API.API_ROOT}${API.POST_REQ_DISCUSSION}/${rid}`, {
        content,
    },{
        Authorization: 'token ' + token,
    })
}
