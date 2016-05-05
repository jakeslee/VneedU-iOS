import API from '../Constants/API';
import { post, get, put } from './NetworkService';

export function add_requirement(params, token = '') {
    return post(`${API.API_ROOT}${API.REQUIREMENT}`, params, {
        Authorization: 'token ' + token,
    });
}
