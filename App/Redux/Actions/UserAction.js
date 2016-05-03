import {
    AlertIOS
} from 'react-native';

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
    signup,
    getUser,
} from '../../Services/UserService';

import { getErrorsMessage } from '../../Constants/Errors';

function request_login() {
    return {
        type: Types.REQUEST_LOGIN,
    };
}

function request_register() {
    return {
        type: Types.REQUEST_SIGNUP,
    }
}

function recv_login(data) {
    return {
        type: Types.RECV_LOGIN,
        data,
    };
}

function recv_register(data) {
    return {
        type: Types.RECV_SIGNUP,
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
                    dispatch(refresh_user(value));
                }
            })
    }
}

export function refresh_user(old_user) {
    return (dispatch) => {
        return getUser(old_user.token)
            .then((response) => response.json())
            .then((json) => {
                if (json.error === 0) {
                    saveToStorage('user', JSON.stringify(Object.assign({}, old_user, json.retData.user))).then(()=> {
                        dispatch(set_authorization(json.retData.user));
                    }).done();
                } else {
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
                    dispatch(user_logout());
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
                if (json.error === 0) {
                    dispatch(recv_login(json));
                    saveToStorage('user', JSON.stringify(json.retData.user)).then(()=> {
                        Actions.pop();
                        Actions.refresh();
                    }).done();
                } else {
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
                }
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

export function user_register(username, password) {
    return (dispatch) => {
        dispatch(request_register);
        return signup({
            phone: username,
            password,
        }).then((response) => response.json())
        .then((json) => {
            console.log(json, getErrorsMessage(json.error))
            if (json.error === 0) {
                dispatch(recv_register(json));
                saveToStorage('user', JSON.stringify(json.retData.user)).then(()=> {
                    Actions.callback({key: 'main', type: 'reset'})
                    Actions.refresh();
                }).done();
            } else {
                AlertIOS.alert('错误', getErrorsMessage(json.error));
            }
        })
    }
}

