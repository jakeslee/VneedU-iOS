import { Actions } from 'react-native-router-flux';
import Types from '../../Constants/ActionTypes';

import {
    loadFromStorage,
    saveToStorage,
    removeFromStorage, 
} from '../../Services/StorageService';

import {
    add_requirement,
} from '../../Services/RequirementService';

import { getErrorsMessage } from '../../Constants/Errors';

function request_requirement(category) {
    return {
        type: Types.REQUEST_REQUIREMENT,
        category,
    }
}

function request_post(isPosting) {
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

export function post_requirement(data = {}, category, current_user) {
    return (dispatch)=> {
        dispatch(request_post(true));
        return add_requirement({
            ...data,
            category,
        }, current_user.token).then((response)=> response.json())
            .then((json)=> {
                dispatch(request_post(false));
                if (json.error === 0) {
                    dispatch(insert_req(data, category));
                    dispatch(insert_req(data, 'latest'));
                    Actions.pop();
                    Actions.refresh();
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            });
    }
}
