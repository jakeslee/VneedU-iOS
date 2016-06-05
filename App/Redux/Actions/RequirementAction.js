import {
    AlertIOS
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Types from '../../Constants/ActionTypes';
import { delay } from '../../Common/Base';

import {
    loadFromStorage,
    saveToStorage,
    removeFromStorage, 
} from '../../Services/StorageService';

import { save_cache_to_local, set_cdn } from './AppAction';

import {
    add_requirement,
    fetch_latest_requirement,
    fetch_requirement_detail,
    post_req_discussion,
    fetch_req_discussions,
} from '../../Services/RequirementService';

import { load_discussions } from './CommentAction';

import { getErrorsMessage } from '../../Constants/Errors';

export function request_requirement(category, append = false, value = true) {
    return {
        type: append ? Types.REQUEST_REQ_APPEND : Types.REQUEST_REQUIREMENT,
        category,
        value,
    }
}

export function request_post(isPosting = true) {
    return {
        type: Types.REQUEST_REQ_ADDING,
        isPosting,
    }
}

function request_req_detail(isFetching = true) {
    return {
        type: Types.REQUEST_REQ_DETAIL,
        isFetching,
    }
}

function insert_req(item, category) {
    return {
        type: Types.INSERT_REQUIRMENT,
        item,
        category,
    }
}

function load_req(items, category, page, max_pages, append = false) {
    return {
        type: append ? Types.LOAD_REQUIREMENT_APPEND : Types.LOAD_REQUIREMENT,
        items,
        category,
        page,
        max_pages,
    }
}

function recv_req_detail(content) {
    return {
        type: Types.RECV_REQ_DETAIL,
        content,
    }
}

export function post_requirement(data = {}, category, current_user) {
    return (dispatch)=> {
        dispatch(request_post());
        return add_requirement(data, current_user.token).then((response)=> response.json())
            .then((json)=> {
                dispatch(request_post(false));
                delay().then(()=> {
                    if (json.error === 0) {
                        AlertIOS.alert('提示', '添加成功', [{
                            text: '确定', 
                            onPress: () => {
                                Actions.pop();
                                console.log('save success');
                                dispatch(load_new_requirements('latest', 1));
                            }},
                        ]);
                    } else 
                        AlertIOS.alert('错误', getErrorsMessage(json.error));
                })
            }).catch(function(reason) {
                AlertIOS.alert('错误', '添加失败！');
                dispatch(request_post(false));
                console.warn(reason);
            });
    }
}

export function load_new_requirements(category, page = 1, append = false) {
    return (dispatch)=> {
        dispatch(request_requirement(category, append));
        return fetch_latest_requirement(category, page, {
            expand: 'category,images,publisher',
            exclude: 'address'
        }).then((response)=> response.json())
            .then((json)=> {
                dispatch(request_requirement(category, append, false));
                if (json.error === 0) {
                    dispatch(set_cdn(json.retData.cdn));
                    dispatch(load_req(json.retData.requirements, category, page, json.retData.page.max_pages, append));
                    dispatch(save_cache_to_local());
                    console.log(`loading ${category} of requirement at page ${page}`);
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            })
            .catch((reason)=> {
                console.log(reason);
                dispatch(request_requirement(category, append, false));
                AlertIOS.alert('错误', '获取信息失败');
            });
    }
}

export function load_req_detail(id) {
    return (dispatch)=> {
        dispatch(request_req_detail());
        return fetch_requirement_detail(id, {
            expand: 'publisher, category, keywords, images'
        }).then((response)=> response.json())
            .then((json)=> {
                dispatch(request_req_detail(false));
                if (json.error === 0) {
                    dispatch(recv_req_detail(json.retData.requirement));
                    dispatch(load_discussions(id));
                } else {
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
                }
            }).catch((reason)=> {
                console.log(reason);
                dispatch(request_req_detail(false));
                AlertIOS.alert('错误', '操作失败');
            });
    }
}

export function clr_req_detail() {
    return {
        type: Types.CLR_REQ_DETAIL,
    }
}
