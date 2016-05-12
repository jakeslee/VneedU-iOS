import {
    AlertIOS
} from 'react-native';
import { compose } from 'redux';
import { Actions } from 'react-native-router-flux';
import Types from '../../Constants/ActionTypes';

import { set_tabbar, set_cdn } from './AppAction';

import {
    loadFromStorage,
    saveToStorage,
    removeFromStorage, 
} from '../../Services/StorageService';

import {
    login,
    signup,
    getUser,
    set_profile,
    changeAvatar,
    reset_password,
    getRequirements,
    getJudgements,
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

export function request_post_judgement(isPosting = true) {
    return {
        type: Types.REQUEST_POST_JUDGEMENT,
        isPosting,
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

function request_other_user() {
    return {
        type: Types.REQUEST_OTHER_USER,
    }
}

function request_user_req() {
    return {
        type: Types.REQUEST_USER_REQ,
    }
}

export function request_upload_avatar(uploading = true) {
    return {
        type: Types.REQUEST_UPLOAD_AVATAR,
        uploading,
    }
}

function request_user_judge() {
    return {
        type: Types.REQUEST_USER_JUDGE,
    }
}

function recv_user_req(items) {
    return {
        type: Types.RECV_USER_REQ,
        items,
    }
}

function recv_user_judge(items) {
    return {
        type: Types.RECV_USER_JUDGE,
        items,
    }
}

function recv_other_user(content) {
    return {
        type: Types.RECV_OTHER_USER,
        content,
    }
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
                    compose(
                        saveToStorage('user', JSON.stringify(Object.assign({}, old_user, json.retData.user)))
                            .then(()=> dispatch(set_authorization(json.retData.user))).done(),
                        saveToStorage('cdn_config', JSON.stringify(json.retData.cdn))
                            .then(()=> dispatch(set_cdn(json.retData.cdn)))
                    );
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
            Actions.callback({key: 'main', type: 'reset'});
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

export function modify_user(current_user, params = {}) {
    return (dispatch) => {
        return set_profile(current_user.token, params)
            .then((response)=> response.json())
            .then((json) => {
                if (json.error === 0) {
                    let new_user = Object.assign({}, current_user, params);
                    dispatch(set_authorization(new_user));
                    AlertIOS.alert('提示', '帐号更新成功保存', [{
                        text: '确定', 
                        onPress: () => saveToStorage('user', JSON.stringify(new_user)).then(()=> {
                            Actions.pop();
                        }).done()},
                    ]);
                    
                }
            });
    }
}

export function modify_password(current_user, new_password) {
    return (dispatch) => {
        return reset_password(new_password, current_user.token)
            .then((response) => response.json())
            .then((json) => {
                if (json.error === 0) {
                    // 如果修改成功则需要重新登录
                    dispatch(user_logout());
                    AlertIOS.alert('提示', '帐号密码已经修改，请重新登录！');
                } else {
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
                }
            })
    }
}

export function load_judgements(uid, current_user) {
    return (dispatch)=> {
        dispatch(request_user_judge());
        return getJudgements(uid, current_user.token)
            .then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(recv_user_judge(json.retData.judgements));
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            }).catch((e)=>{
                console.log(e)
            })
    }
}

export function load_requirements(uid, current_user) {
    return (dispatch)=> {
        dispatch(request_user_req());
        return getRequirements(uid, current_user.token)
            .then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(recv_user_req(json.retData.requirements));
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            })
    }
}

export function load_user(uid, current_user) {
    return (dispatch)=> {
        dispatch(request_other_user());
        return getUser(current_user.token, uid)
            .then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(recv_other_user(json.retData.user));
                    dispatch(load_requirements(uid, current_user));
                    dispatch(load_judgements(uid, current_user));
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            })
    }
}

export function do_change_avatar(userFileId, current_user) {
    return (dispatch)=> {
        return changeAvatar(userFileId, current_user.token)
            .then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(request_upload_avatar(false));
                    dispatch(refresh_user(current_user));
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            });
    }
}
