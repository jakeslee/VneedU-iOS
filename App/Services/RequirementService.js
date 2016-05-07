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
