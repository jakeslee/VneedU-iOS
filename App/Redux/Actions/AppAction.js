import { compose } from 'redux';
import Types from '../../Constants/ActionTypes';

import {
    loadFromStorage,
    saveToStorage,
    removeFromStorage, 
} from '../../Services/StorageService';

export function set_tabbar(tabName = 'home', show = true) {
    return {
        type: Types.SET_TABBAR,
        selected: tabName,
        showed: show,
    }
}

export function set_cdn(cdn_config) {
    return {
        type: Types.SET_CDN,
        cdn_config,
    }
}

export function set_pushstatus(pushIsOn) {
    return {
        type: Types.SET_PUSHSTATUS,
        pushIsOn,
    }
}

export function load_config() {
    return (dispatch) => {
        return compose(
            loadFromStorage('cdn_config').then((v) => {
                dispatch(set_cdn(JSON.parse(v)));
                console.log(v, '--- loading settings ----');
            }).done(),
        );
    }
}
