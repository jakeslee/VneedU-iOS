import { Actions } from 'react-native-router-flux';
import Types from '../../Constants/ActionTypes';

import { set_tabbar } from './AppAction';

import {
    loadFromStorage,
    saveToStorage,
    removeFromStorage, 
} from '../../Services/StorageService';

import {
    login,
} from '../../Services/UserService';

function request_login() {
    return {
        type: Types.REQUEST_LOGIN,
    };
}

function recv_login(data) {
    return {
        type: Types.RECV_LOGIN,
        data,
    };
}

function set_authorization(user) {
    return {
        type: Types.SET_AUTHORIZATION,
        user,
    }
}

function set_logout() {
    return {
        type: Types.LOGOUT,
    }
}

export function loadUserFromStorage() {
    return (dispatch)=> {
        return loadFromStorage('user')
            .then((value)=>{
                if (value) {
                    value = JSON.parse(value);
                    dispatch(set_authorization(value));
                }
            })
    }
}

export function user_login(username, password) {
    return (dispatch) => {
        dispatch(request_login());
        return login(username, password)
            .then((response) => response.json())
            .then((json) => {
                dispatch(recv_login(json));
                saveToStorage('user', JSON.stringify(json.retData.user)).then(()=> {
                    Actions.pop();
                    Actions.refresh();
                }).done();
            });
    }
}

export function user_logout() {
    return (dispatch) => {
        dispatch(set_logout());
        return removeFromStorage('user').then(()=>{
            dispatch(set_tabbar());
            Actions.refresh();
        });
    }
}

