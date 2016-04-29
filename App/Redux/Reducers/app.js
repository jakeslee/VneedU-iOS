import Types from '../../Constants/ActionTypes';

export default function reducer(state = {
    title: '',
    scene: {},
    pushIsOn: true,
    selectedTab: 'home',
    showTopBar: true,
    cdn_root: null,
}, action = {}) {

    switch(action.type) {
        case "focus":
            return {
                ...state,
                scene: action.scene
            };
        case Types.SET_CDN:
            return {
                ...state,
                cdn_root: action.cdn_root,
            }
        case Types.SET_PUSHSTATUS:
            return {
                ...state,
                pushIsOn: action.pushIsOn,
            }
        case Types.SET_TABBAR:
            return {
                ...state,
                selectedTab: action.selected,
                showTopBar: !!action.showed,
            }
        default: 
            return state;
    }
}
