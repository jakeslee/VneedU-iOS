import Types from '../../Constants/ActionTypes';

export function set_tabbar(tabName = 'home', show = true) {
    return {
        type: Types.SET_TABBAR,
        selected: tabName,
        showed: show,
    }
}

export function set_cdn(cdn_root) {
    return {
        type: Types.SET_CDN,
        cdn_root,
    }
}

export function set_pushstatus(pushIsOn) {
    return {
        type: Types.SET_PUSHSTATUS,
        pushIsOn,
    }
}
