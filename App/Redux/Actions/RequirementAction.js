import {
    AlertIOS
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Types from '../../Constants/ActionTypes';

import {
    loadFromStorage,
    saveToStorage,
    removeFromStorage, 
} from '../../Services/StorageService';

import {
    add_requirement,
    fetch_latest_requirement,
} from '../../Services/RequirementService';

import { getErrorsMessage } from '../../Constants/Errors';

function request_requirement(category) {
    return {
        type: Types.REQUEST_REQUIREMENT,
        category,
    }
}

export function request_post(isPosting) {
    return {
        type: Types.REQUEST_REQ_ADDING,
        isPosting,
    }
}

function insert_req(item, category) {
    return {
        type: Types.INSERT_REQUIRMENT,
        item,
        category,
    }
}

function load_req(items, category, page) {
    return {
        type: Types.LOAD_REQUIREMENT,
        items,
        category,
        page,
    }
}

export function post_requirement(data = {}, category, current_user) {
    return (dispatch)=> {
        return add_requirement(data, current_user.token).then((response)=> response.json())
            .then((json)=> {
                dispatch(request_post(false));
                if (json.error === 0) {
                    dispatch(insert_req(data, category));
                    dispatch(insert_req(data, 'latest'));
                    AlertIOS.alert('提示', '添加成功', [{
                        text: '确定', 
                        onPress: () => {
                            Actions.pop();
                            Actions.refresh();
                        }},
                    ]);
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            }).catch(function(reason) {
                AlertIOS.alert('错误', '添加失败！');
                console.warn(reason);
            });
    }
}

export function load_new_requirements(category, page = 1) {
    return (dispatch)=> {
        dispatch(request_requirement(category));
        return fetch_latest_requirement(category, page, {
            expand: 'category,images,publisher',
            exclude: 'address'
        })
            .then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(load_req(json.retData.requirements, category, page));
                    
                    console.log(`loading ${category} of requirement at page ${page}`);
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            });
    }
}
