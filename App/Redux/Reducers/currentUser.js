import Types from '../../Constants/ActionTypes';

const initialState = {
    uploading: false,
    isFetching: false,
    user: {},
    hasError: null, 
    result: null,
};

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case Types.REQUEST_UPLOAD_AVATAR:
            return {
                ...state,
                uploading: action.uploading,
            }
        case Types.SET_AUTHORIZATION:
            return {
                ...state,
                user: Object.assign({}, state.user, action.user),
            };
        case Types.REQUEST_LOGIN:
            return {
                ...state,
                isFetching: true,
                user: {},
                hasError: null, 
                result: null,
            }
        case Types.RECV_LOGIN:
        case Types.RECV_SIGNUP:
            return {
                ...state,
                isFetching: false,
                user: action.data.retData.user,
                hasError: action.data.error, 
                result: action.data.message,
            }
        case Types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}
